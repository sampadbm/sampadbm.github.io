---
date: 2026-04-12
title: Project & Paper Ideas
tags: [reference, research, ideas]
summary: A living list of personal project and paper ideas I would like to work on.
---

This is a running list of personal project and paper ideas I would like to spend time on. Some are concrete follow-ups to things I am already reading; others are speculative. I am putting them in public partly as a commitment device.

**If any of these overlap with what you are thinking about, feel free to reach out** — I am always happy to hear from people working on similar ideas. Email: [sbmohant@usc.edu](mailto:sbmohant@usc.edu).

---

### Ideas

#### 1. Personalized per-program ranking for JEE / JoSAA seat allocation

- **Seed literature:**
  - Gale & Shapley (1962), *College Admissions and the Stability of Marriage* — the deferred-acceptance algorithm that underlies JoSAA.
  - Abdulkadiroğlu & Sönmez (2003), *School Choice: A Mechanism Design Approach* — strategy-proof assignment with multi-attribute preferences.
  - Liu (2009), *Learning to Rank for Information Retrieval* — pointwise / pairwise / listwise LETOR methods that transfer directly to admissions ranking.
  - JoSAA's own public counseling data (round-wise opening/closing ranks by institute and program) as evaluation substrate.

- **Why it interests me:** The current system compresses a high-dimensional student profile — subject-wise JEE scores, attempt pattern, board marks, revealed preference ordering over programs — into a single scalar rank, and then applies one global merit ordering across every program in the country. That throws away all the program-conditional signal. A math-heavy candidate and a chemistry-heavy candidate at the same aggregate rank are interchangeable to the current allocator, but emphatically not interchangeable to a CS-theory program vs. a chemical-engineering program. A per-program personalized rank — learned from historical outcomes (grades, graduation, placement, attrition) at each institute — should Pareto-dominate the scalar rank on candidate–program fit while still plugging into deferred acceptance as the program-side preference, so the stability and strategy-proofness guarantees survive. The question this answers, concretely: *should a #3000-ranked candidate with a top-percentile math score get priority for a theory-heavy CS program over a #2000-ranked generalist?* The scalar rank says no; the data likely says yes.

- **What a first step looks like:** Pull a few years of JoSAA round-wise opening/closing ranks by institute+program, combine with publicly available JEE-Advanced subject-score distributions, and simulate two allocations on a synthetic student population calibrated to those distributions: (a) the current aggregate-rank DA, (b) DA where each program's preference ordering is a learned function of subject scores, calibrated so that programs prefer students whose score structure matches their curriculum. Measure the shift in candidate–program fit under both, and verify that the personalized version remains strategy-proof when program preferences are fixed ex ante.

#### 2. A multi-species suffering index for countries

- **Seed literature:**
  - Rethink Priorities, *Moral Weight Project* (Fischer et al., 2022) — species-level cross-comparisons of capacity for welfare, grounded in measurable behavioral and neurological proxies.
  - Birch, Schnell & Clayton (2020), *Dimensions of Animal Consciousness* — the argument that sentience is multi-dimensional rather than scalar, with implications for how weights are constructed.
  - Welfare Footprint Project — pain-adjusted life years (PALYs) methodology for farmed animals.
  - Environmental Performance Index (Yale), Voiceless Animal Cruelty Index, Animal Protection Index — the existing siloed rankings to triangulate against.
  - Tomasik, *Wild animal suffering* essays — the argument for including wild-animal welfare, which is numerically dominant but almost universally omitted from country-level indices.
  - IHME Global Burden of Disease (DALYs) — the standard anthropocentric human-suffering substrate.

- **Why it interests me:** Country rankings drive policy, aid flows, and public narrative. But every widely cited one is either (i) purely anthropocentric (HDI, Human Suffering Index, Misery Index), (ii) purely environmental (EPI), or (iii) purely animal-welfare-focused on a narrow slice (factory farming, or companion-animal protection). No index tries to put humans, farmed animals, wild animals, and ecosystems on a common axis, even though most moral frameworks people actually hold place weight on all four. The standard objection is "the weights would be arbitrary" — but the welfare-biology literature now offers defensible cross-species weights derived from measurable proxies (nociception, behavioral flexibility, social cognition, mirror self-recognition), and the slaughter and welfare-footprint literature gives quantitative per-species suffering estimates. The hard part is *combining them honestly*; the weights should be exposed as tunable inputs rather than hidden inside the score. Human suffering gets the largest weight by construction, but the ratio is a dial the reader can turn, not a fait accompli buried in a methodology appendix. I want to build the index as a transparent, reproducible pipeline where every weight is sourced and every ranking is one function call away from a sensitivity sweep.

- **What a first step looks like:** Build a minimal v0 on ~20 countries. Inputs: FAO per-capita meat-consumption tables (by species), Rethink Priorities' moral-weight point estimates, IHME DALYs for the human-suffering term, and the EPI ecosystem-vitality subcomponent. Publish it as a notebook + spreadsheet with every weight and source tagged, and run a sensitivity sweep showing how the ranking moves as the human-to-non-human weight ratio varies from 1× to 10,000×. The goal of v0 isn't "the true ranking" — it's to show which countries' positions are **robust** across a wide band of defensible weightings and which are **fragile**, and that the distinction is itself informative.

#### 3. [Title of the idea]

- **Seed paper(s):**
- **Why it interests me:**
- **What a first step looks like:**

---

### Get in touch

If any of the above resonates — or if you have an idea of your own that feels adjacent — send me a note at [sbmohant@usc.edu](mailto:sbmohant@usc.edu).
