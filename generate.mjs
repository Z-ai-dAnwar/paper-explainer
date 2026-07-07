// Generate Kokoro TTS narration + word-level timings for the Patel explainer.
// Run: node generate.mjs
import { KokoroTTS } from "kokoro-js";
import fs from "node:fs";

const VOICE = process.env.VOICE || "af_heart"; // warm American female
const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";

const scenes = [
  { id: 1, script: "Two patients walk into a clinic. Both are stiff, slow, a little unsteady. One has Parkinson's disease, which is treatable, with decades ahead. The other has P S P, which is aggressive, and the Parkinson's drugs barely touch it. Same looking patient. Opposite futures." },
  { id: 2, script: "Here's the gut punch. In the early years, even expert neurologists often can't tell them apart. They look identical. The correct diagnosis only becomes clear years later, long after the moment it could have changed anything. So the question is, is there something we can measure today that tells them apart?" },
  { id: 3, script: "The eyes are the place to look, because P S P attacks the eye movement system harder than Parkinson's does. Watch a saccade, the fast flick your eyes make jumping from one point to another. You're making one every line you read. And we can record its exact motion as a curve." },
  { id: 4, script: "The obvious move is to measure simple numbers, like how fast the saccade went. On average, P S P saccades are a bit slower. But the ranges overlap. A slow Parkinson's patient and a fast P S P patient land on the exact same number. Hand me one person's number, and I often can't call it. That's the wall every older method hit." },
  { id: 5, script: "Here's Patel's insight. A saccade isn't a number, it's a shape. The eye accelerating, peaking, then settling. Squeezing that whole curve down to one number like peak speed is like describing a song by its single loudest note. The disease signature lives in the shape of the whole curve, and the old methods were blind to it." },
  { id: 6, script: "So here's the trick, with an analogy. Imagine three forgery experts. One spent his whole life studying only Parkinson's saccade curves. One studied only P S P. One studied only healthy. Each can redraw its own kind perfectly, and fumbles the others. Now a new patient's curve comes in. All three try to redraw it. Whoever copies it with the least error, that expert's diagnosis is the answer." },
  { id: 7, script: "But one saccade can lie. So it's done in two stages. First, score every single saccade the patient made. Then look at the whole spread of those scores and make the final call for the person, not off one lucky curve, but off the pattern across all of them." },
  { id: 8, script: "And here's a bonus. Because the experts only care about the shape of the curve, not its exact size or position on the screen, you can skip the fussy eye tracker calibration that makes this a pain in a real clinic. Shrink the curve, shift it, same shape, same answer. That's why Patel dreams of doing this someday on a phone camera." },
  { id: 9, script: "Did it work? Telling newly diagnosed Parkinson's from P S P, the shape method scored ninety four out of a hundred. The old numbers method scored seventy five. Remember, one point zero is perfect and a half is a coin flip. The shape carried real signal the numbers were throwing away." },
  { id: 10, script: "So notice where this stops. Patel answers which disease it is, today. It never asks what happens tomorrow, how fast the patient will decline, or how long they have. That's the open frontier, turning a one time diagnosis into a prediction about the future. And it's exactly the kind of gap a new model, on the right data, could be the first to fill." },
];

// distribute word start/end times across a scene's measured duration, weighted by characters
function wordTimings(script, duration) {
  const words = script.split(/\s+/).filter(Boolean);
  const weights = words.map((w) => w.length + 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let cum = 0;
  return words.map((w, i) => {
    const start = (cum / total) * duration;
    cum += weights[i];
    const end = (cum / total) * duration;
    return { w, start: +start.toFixed(3), end: +end.toFixed(3) };
  });
}

console.log(`Loading Kokoro (${MODEL}) - first run downloads ~80MB...`);
const tts = await KokoroTTS.from_pretrained(MODEL, { dtype: "q8", device: "cpu" });
console.log(`Model ready. Voice = ${VOICE}. Rendering ${scenes.length} scenes...`);

const timings = [];
for (const s of scenes) {
  process.stdout.write(`  scene ${s.id}... `);
  const audio = await tts.generate(s.script, { voice: VOICE });
  const path = `audio/scene-${s.id}.wav`;
  audio.save(path);
  const dur = audio.audio.length / audio.sampling_rate;
  timings.push({ id: s.id, dur: +dur.toFixed(3), words: wordTimings(s.script, dur) });
  console.log(`${dur.toFixed(1)}s -> ${path}`);
}

// Emit timings AND the raw scripts (the engine reads window.SCRIPTS for live in-browser voice re-synthesis).
fs.writeFileSync(
  "timings.js",
  "window.TIMINGS = " + JSON.stringify(timings) + ";\n" +
  "window.SCRIPTS = " + JSON.stringify(scenes.map((s) => s.script)) + ";\n"
);
console.log("Wrote timings.js (TIMINGS + SCRIPTS). Done.");
