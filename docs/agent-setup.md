# Self-setup prompt (shareable)

Two ways to share this. Both end with a working explainer and require the recipient to run **zero** commands by hand — their AI agent does it all.

## Option A — point the agent at the GitHub repo (easiest to share)

Tell the person to paste this into their own Claude Code (or any coding agent):

> Clone the repo at `https://github.com/Z-ai-dAnwar/paper-explainer` and follow its README to set yourself up, then build me a narrated video-style explainer of **<paper title or arXiv link>**. Read the paper, design 8-12 scenes in the AI-Search teaching style described in the repo (hook with the pain, one central analogy, jargon last), generate the Kokoro narration, build the animated player, and open it for me. Don't ask me to run any commands — do it all yourself and just open the finished explainer.

That's the whole instruction. The README carries the rest.

## Option B — fully self-contained prompt (no repo needed)

If you'd rather not send a link, paste this entire block to the agent. It contains everything.

---

You are going to build a **local, self-narrating, video-style interactive explainer** of a research paper: **<PAPER>**. The user should run nothing by hand — you do all setup and building, then open the result.

**What you're building:** a single-folder web app (opens over `file://`) that plays a real open-source voice narrating the paper scene by scene, with a per-scene canvas animation, a karaoke transcript that highlights each word as spoken, speed control, rewind/scrub, and fullscreen.

**Setup (do this yourself, silently):**
1. Check `node -v` and `ffmpeg -version` exist. If node is missing, install it (`brew install node` on macOS). 
2. Make a working folder with an `audio/` subdir. Write a `package.json` with `{ "type":"module", "dependencies":{ "kokoro-js":"^1.2.0" } }` and run `npm install`. (This pulls onnxruntime; the ~80MB Kokoro voice model downloads on first generate and caches.)

**Teaching style (non-negotiable — this is why it works):**
- Hook with the *pain* first (why anyone cares) before any mechanism.
- Build the problem before the solution so the fix feels earned.
- Carry the hard idea on ONE concrete analogy.
- One idea per scene; name the jargon LAST, after the intuition lands.
- Close on the payoff or the open question.

**Author 8-12 scenes.** For each: a ~15-25s spoken script (spell tricky acronyms as spaced letters like "P S P"; no markdown; numbers as words where clearer) and a simple canvas visual that *shows* the idea (not decoration).

**Generate the voice:** write `generate.mjs` that imports `KokoroTTS` from `kokoro-js`, loads `onnx-community/Kokoro-82M-v1.0-ONNX` (dtype `q8`, device `cpu`, voice `af_heart`), loops your scenes, saves `audio/scene-N.wav` via `audio.save()`, computes each clip's duration from `audio.audio.length / audio.sampling_rate`, distributes per-word start/end times across that duration weighted by word character-length, and writes `timings.js` = `window.TIMINGS = [...]`. Run it.

**Build the player HTML:** a dark "signal monitor" themed page (amber/cyan/lilac on near-black) with: an `<audio>` element, big play/pause, per-scene canvas animations index-aligned with the narration, a caption band, scene dots, a progress rail you can click to scrub, a speed button cycling 0.75/1/1.25/1.5/2×, a rewind-8s button + `J` key, fullscreen via a button + `F` key, and a live transcript panel that highlights each word as spoken (bright-behind, amber-active, dim-ahead) and auto-scrolls — plus a small floating transcript window in the bottom-right when fullscreen. Drive word-highlighting off the audio's `timeupdate` against `window.TIMINGS`. Keyboard: space play/pause, arrows change scene, `J` back-8s, `F` fullscreen.

**Finish:** open the HTML in the browser and tell the user it's ready. If any scene's audio 404s, it's a filename mismatch — fix the path.

---

Reference implementation (the proven original this is modeled on): the repo's `generate.mjs` (narration) + `scenes.js` (visuals) + `player.html` (the content-free engine you don't edit).
