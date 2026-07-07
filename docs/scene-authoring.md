# Scene authoring guide

A scene has two halves that must stay index-aligned: a **narration** entry (in `generate.mjs`) and a **visual** entry (in `scenes.js`). Scene 1's script is spoken while scene 1's visual animates. You never touch `player.html` (the engine) to author a paper — only `generate.mjs`, `scenes.js`, and the `timings.js`/audio it generates.

## The narration half (generate.mjs)

```js
{ id: 1, script: "Two patients walk into a clinic. Both are stiff, slow..." }
```

Rules that make the voice sound right:
- **Spell tricky acronyms as spaced letters** so the TTS says them: `"P S P"`, not `"PSP"` (which it may try to pronounce). Same for `"D B S"`, `"L F P"`.
- **Numbers**: write as words when they read better spoken (`"ninety four out of a hundred"` beats `"0.94"`), but plain digits are fine mid-sentence.
- **No markdown, no symbols** — this is read aloud. Write `"and"` not `"&"`, spell out `"percent"`.
- **Punctuate for breath.** Commas and periods become the natural pauses. Short sentences sound better than long ones.
- Keep each script ~15-25 seconds spoken (roughly 40-70 words).

## The visual half (scenes.js)

`scenes.js` sets `window.SCENES` (one entry per scene) and, optionally, `window.META` (the page title/heading/byline). The engine reads both.

```js
window.META = { docTitle:'...', heading:'...', byline:'...' };
window.SCENES = [
  { eyebrow:'The hook', title:'Two patients',
    caption:'Two patients, same symptoms. One has <span class="pd">Parkinson\'s</span>...',
    build:function(PE){ /* draw using the injected PE toolkit */ } },
  // ...
];
```

- `eyebrow` — the little uppercase tag top-left (the scene's theme).
- `title` — short label shown in the transport bar.
- `caption` — the subtitle over the video. Use the color spans (`.pd` cyan, `.psp` amber, `.hc` lilac, `<b>` amber) to tie words to what's on screen. Keep it short; it's a caption, not the script.
- `build(PE)` — draws the animation, using **only** the `PE` toolkit passed in (never engine globals). Return a cleanup function if you start timers you need to stop (most canvas loops don't need one — the engine cancels the RAF).

### The PE toolkit (passed into every `build`)
- `PE.mkCanvas()` → `{c,x,w,h}` — a DPR-correct canvas filling the stage; `x` is the 2D context.
- `PE.line(x, pts, color, width, glow)` — a glowing polyline from `[[x,y],...]`.
- `PE.grid(x,w,h)` — the faint background grid.
- `PE.saccadeY(t, steep)` — an eased 0→1 rise; high `steep` = fast/sharp (healthy), low = slow (PSP). Great for any "signal curve" visual. `PE.smoother(t)` is the raw smoothstep behind it.
- `PE.loop(fn)` — runs `fn(t)` every frame with `t` in seconds. `PE.reduce` is true when the viewer wants reduced motion (draw a static frame instead).
- `PE.stage` — the stage DOM element, for DOM-based scenes (e.g. the 48-dot grid): `PE.stage.appendChild(...)`.
- `PE.mono` / `PE.sans` — the resolved font-family strings, for canvas `x.font`.
- Palette (CSS vars, usable in caption spans and canvas colors): `--psp` amber, `--pd` cyan, `--hc` lilac, `--accent` amber, on near-black.

Why the `PE` handoff instead of globals: it keeps `scenes.js` (content) fully decoupled from `player.html` (engine), so the engine can be shared/updated across explainers without any scene depending on its internals.

### What a good visual does
It *shows the idea*, not decorates it. Examples from the reference:
- A saccade dot actually flicking between targets while its position traces out the waveform below it.
- Two overlapping bell curves with a blinking "this patient = ?" dot sitting in the overlap — the ambiguity made visible.
- Three side-by-side panels where each "forger" redraws the mystery curve, error shaded in red for the wrong ones.
- Animated bars racing to 0.94 vs 0.75 for the result.

Prefer canvas for anything that moves or is generative; DOM (like the 48-dot grid) is fine for simple laid-out elements. Don't hand-author long SVG paths.

## The rhythm
Write all the narration scripts first (the teaching is in the words), run `generate.mjs`, *then* build visuals in `scenes.js` to match. It's easier to draw to a script than to script to a drawing. Read `pedagogy.md` before you write a single script — the arc is the point.
