# The "AI Search" teaching style - the pedagogy that makes these work

This is the load-bearing part of the skill. The animations and voice are the delivery; *this* is why the explainer teaches instead of just talking. It's modeled on how the best educational YouTubers actually write their spoken scripts - AI Search (the primary model), 3Blue1Brown, StatQuest, Veritasium. The rules below were extracted from real transcripts; the quoted lines are verbatim. Follow them.

## The arc (8-12 scenes)

1. **Hook** - the painful, human stakes.
2. **The problem** - make the wall concrete.
3. **The naive approach** - what everyone tries first.
4. **Why it fails** - the wall, shown.
5. **The insight** - the reframe that changes everything.
6. **The mechanism (analogy)** - the central analogy doing the work.
7. **The refinement** - the second half of the method / the messy case.
8. **A bonus/consequence** - a nice property that falls out.
9. **The result** - did it work? one honest number.
10. **What's next / your opening** - the payoff or the gap left open.

## The test for every scene

Would this land for a smart high-schooler seeing the idea for the first time? Read the script out loud (the TTS will). If it sounds like a textbook, it's wrong. If it sounds like a good teacher talking, it's right.

---

## Measured targets (hit these)

- **Median sentence length ~13-15 words**, with frequent drops to fragments. Never three long sentences in a row. Long setup, short payoff: *"40%. And even the next best model, GPT-4, hallucinated 28.6% of the time. More than a quarter."*
- **Address the viewer as "you" roughly every third sentence** (~16-20 times per 1000 words). If a paragraph has no "you," it reads like a textbook, not a script.
- **One rhetorical question every ~400 words**, not every line.
- **One central analogy per concept**, extended, then explicitly bounded.

(3Blue1Brown breaks the short-sentence rule with long, calm, question-free sentences and a "you and I" register - that works too, but don't mix the two registers in one script. Default to the AI Search register unless the user asks otherwise.)

---

## The 13 rules, each with a real example

1. **Open on pain or a concrete impossibility, never a definition or an agenda.** 2-3 sentences, present tense, before any term is named. Shared-experience openings work: *"We've all been there. We ask an AI a question and it confidently gives us the wrong answer."* So do impossible-connection lists: *"What's the connection between a dripping faucet, the Mandelbrot set, a population of rabbits... It's this one simple equation."* Banned: *"In this video we'll explore...", "X is a technique that..."*

2. **Build the problem before the solution, and say you're doing it.** *"Before we jump into the paper, let's understand the problem a bit more."* The viewer must *feel* the failure the method fixes before hearing the method's name.

3. **Make the naive approach fail on screen first.** Let the viewer design it and watch it break: *"One way would be to just take each word separately... However, the problem with this is... It turns out the ideal approach is actually somewhere in between."* The reveal marker is **"It turns out."** This one move turns a lecture into a mystery.

4. **Name the jargon LAST - plain mechanism first, then christen it.** *"It does this by using three special vectors that are learned for each word. These are called the query, the key, and the value."* Or weld the meaning to the term in one sentence by apposition: *"a vector, meaning some list of numbers."* Never use a term, then define it a sentence later.

5. **Voice the viewer's objection at the exact beat they'd have it, then answer with "Well,".** *"You might be thinking, that's way too simple... But as crazy as it sounds, that's exactly how it works."* Aim for one every 400-600 words.

6. **One central analogy per concept, extended, then explicitly bounded.** Ride one image (three forgers each redrawing a curve; fifty chefs dumping into one soup pot). Then close it: **"At least conceptually, that's how you can think of this."** The bounding sentence is mandatory - it keeps the analogy from being read as the literal mechanism.

7. **Restate every hard sentence in plain words with "In other words,".** *"...back propagation optimizes these values one step at a time. In other words, when an input value is 0 it only sends zeros to the activation functions."* If a sentence can't be restated plainly, the script doesn't understand it yet.

8. **Use tiny concrete examples with real values, not abstract descriptions.** *"We multiply 1.87 by 1 to get 1.87."* A worked example with two numbers beats a described one with twelve thousand dimensions.

9. **Keep sentences short; drop to fragments for the payoff.** *"The eye still gets there. It just crawls."* / *"One number is not enough."*

10. **Signpost relentlessly - recap what's done, preview what's next, mark completions.** *"All right, that was a ton of math, but that covers the decoder. Let's quickly summarize what we've gone through so far."* StatQuest's "bam" is the same move: explicitly close each unit before opening the next.

11. **Build tension with a hard turn marker before every reveal.** *"But here's the wall."* / *"Just when you think we solved it, reality slaps you in the face."* / *"So far so good, but now comes the weird part."* One per act.

12. **Be honest about glossing and difficulty - one hedge word where the truth is hedged, zero elsewhere.** *"I'm glossing over some details, but this is a high-level preview."* / *"why eight instead of 12 or 16? I have no idea."* Fake precision is slop; owned imprecision builds trust.

13. **Talk to "you"; use "you and I" for the shared journey.** *"What you and I are going to do is step through each one."* If a whole paragraph has no second person, rewrite it.

---

## Anti-slop checklist (detect and replace)

| Slop pattern | Replace with |
|---|---|
| "delve into" / "dive deep into the world of" | "Let's jump right in." (launch in ≤5 words, only after a real hook) |
| "In this video we'll explore..." agenda open | Cold-open on the pain |
| "It's important to note that X" | "Note, ..." then *show* the failure if X is ignored |
| "X plays a crucial role in Y" | A contrast pair: *"Squatch eats Pizza and Pizza eats Squatch use the same words, opposite meanings"* |
| "In the world of..." / "In the realm of" | Delete. Name the actual thing in the first clause. |
| Tricolon ("faster, smarter, more scalable") | One claim with one number |
| Hedging stacks ("could potentially help improve") | Commit or quantify; keep at most one honest hedge |
| "Moreover / Furthermore / Additionally" | "Now," "Next," "But," "So," "Well," "All right," |
| "utilize / leverage / employ" | "use," "do the math," "spits out" |
| "fascinating / groundbreaking / remarkable" (pre-emptive) | Earn one strong word *after* showing the mechanism |
| "In conclusion, ..." | A step-by-step recap of what was covered |
| Passive ("it can be observed that") | "you can see that...", "you'll notice how..." |
| Term used before it's defined | Mechanism first, name last (rule 4) |
| "Imagine a world where..." | A specific second-person scenario with escalating detail |
| Analogy stated as fact | Append "At least conceptually, that's how you can think of it." |
| Uniform sentence length | Fragment payoffs |
| Em-dashes (also banned house-wide) | Restructure, or use a comma/semicolon/period |
| "game-changer / revolutionize / unlock the power of" | State the concrete consequence with a number |

Also: never imitate a YouTuber's sponsor read or "like and subscribe" outro. Those are the one part of their scripts you do not want.

---

## Worked before/after (medical, the common domain here)

**Slop:** "External validation is essential to ensure the generalizability of machine learning models in clinical settings."

**Rewritten (AI Search voice):** "Here's the dirty secret of medical AI. A model can score 95% in the lab and then fall apart at the hospital across town. Why? Because it was tested on the same kind of patients it was trained on. That's grading your own homework. The fix is called external validation: you freeze the finished model and test it on patients from a hospital it has never seen. If it still works, you've built something real. If it doesn't, you built an expensive pattern-matcher for one building."

Note what changed: a pain the viewer can feel, present tense, a question, a plain analogy ("grading your own homework"), the term named *after* the intuition, a fragment, and a concrete stake instead of the word "essential."

## Common failure modes

- **Jargon-first.** Term before intuition. Reorder.
- **Decorative visuals.** A visual that doesn't *show the idea* is filler.
- **Flat narration.** Listing facts with no "but here's the problem" turn.
- **Two ideas in one scene.** Split them.
- **Skipping the pain.** Starting with the method before the viewer wants the answer.
