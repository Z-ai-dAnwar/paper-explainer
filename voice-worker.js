// Kokoro TTS synthesis, off the main thread so the page never freezes.
// Loaded as a module worker: new Worker('voice-worker.js', {type:'module'}).
let ttsPromise = null;

async function getTTS() {
  if (!ttsPromise) {
    const mod = await import('./node_modules/kokoro-js/dist/kokoro.web.js');
    ttsPromise = mod.KokoroTTS.from_pretrained(
      'onnx-community/Kokoro-82M-v1.0-ONNX',
      { dtype: 'q8', device: 'wasm' }
    );
  }
  return ttsPromise;
}

// Process requests strictly one at a time - concurrent ONNX inference thrashes an 8GB machine.
let chain = Promise.resolve();
self.onmessage = (e) => {
  const msg = e.data || {};
  if (msg.type !== 'synth') return;
  chain = chain.then(() => handle(msg)).catch(() => {});
};

async function handle(msg) {
  const { reqId, voice, index, script } = msg;
  try {
    const firstLoad = !ttsPromise;
    if (firstLoad) self.postMessage({ type: 'loading', reqId });
    const tts = await getTTS();
    const audio = await tts.generate(script, { voice });
    let wav = audio.toWav();               // ArrayBuffer (or typed array)
    if (ArrayBuffer.isView(wav)) wav = wav.buffer;
    self.postMessage(
      { type: 'result', reqId, index, wav, sampleRate: audio.sampling_rate, samples: audio.audio.length },
      [wav]
    );
  } catch (err) {
    self.postMessage({ type: 'error', reqId, index, message: String((err && err.message) || err) });
  }
}
