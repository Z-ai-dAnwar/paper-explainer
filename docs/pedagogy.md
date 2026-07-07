# The "AI Search" teaching style — the pedagogy that makes these work

This is the load-bearing part of the skill. The animations and voice are the delivery; *this* is why the explainer teaches instead of just talking. It's modeled on the YouTube channel "AI Search," which reliably makes hard ML papers click for non-experts. Follow the arc.

## The six rules

1. **Hook with the pain first.** Open on the problem the viewer can feel, before any mechanism. Not "PSP is a tauopathy" but "two patients look identical, but one has months and one has decades — and no one can tell which." Motivation before machinery. The first scene should make someone care, not inform them.

2. **Build the problem before the solution.** Walk: how the thing currently works → where it breaks → why the obvious fix fails → *then* the new idea. The solution has to feel *earned*. If you hand over the method before the viewer feels the wall it climbs, they won't understand why it's clever.

3. **One central analogy carries the hard idea.** Pick a single concrete, human analogy per method and ride it (the Patel explainer uses "three forgery experts, each redraws in their own style; whoever copies the mystery curve best wins"). The viewer remembers the analogy; the mechanism rides along on it. Don't stack three metaphors — one, done well.

4. **Progressive disclosure.** One idea per scene, each building on the last. Name the explicit tension out loud ("careful but slow" vs "fast but sloppy") so the resolution feels like a payoff. Never introduce two new concepts in one breath.

5. **Name the jargon LAST.** Teach the intuition, *then* attach the label. "The expert who redraws in one style" first; only after it's clear do you say "this is called an autoencoder." For genuinely hard math, give the gist and say "the details are more than we need here" rather than dumping it. Jargon-first is the single most common way these fail — if a scene uses a term before the picture exists, reorder it.

6. **Close on why it matters / what's next.** End with the payoff or the open door — for research, the gap the paper leaves that the viewer could walk through.

## The test for every scene

Would this land for a smart high-schooler seeing the idea for the first time? If a sentence only makes sense to someone who already knows the field, rewrite it. Read the script out loud (the TTS will) — if it sounds like a textbook, it's wrong; if it sounds like a good teacher talking, it's right.

## Scene arc template (8-12 scenes)

A reliable skeleton — adapt, don't force:

1. **Hook** — the painful, human stakes.
2. **The problem** — make the wall concrete.
3. **The naive approach** — what everyone tries first.
4. **Why it fails** — the wall, shown.
5. **The insight** — the reframe that changes everything.
6. **The mechanism (analogy)** — the central analogy doing the work.
7. **The refinement** — the second half of the method / how they handle the messy case.
8. **A bonus/consequence** — a nice property that falls out.
9. **The result** — did it work? one honest number.
10. **What's next / your opening** — the payoff or the gap left open.

## Common failure modes to avoid

- **Jargon-first.** Term before intuition. Reorder.
- **Decorative visuals.** A visual that doesn't *show the idea* is filler. Every animation should be the concept made visible.
- **Flat narration.** Listing facts instead of building tension. If there's no "but here's the problem…" turn, the scene is probably just exposition.
- **Two ideas in one scene.** Split them.
- **Skipping the pain.** Starting with the method instead of why anyone needs it. The viewer must want the answer before you give it.
