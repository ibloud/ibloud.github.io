# 50 Ways to Leave Another — Curriculum & Rubric Audit

Dominique Devereaux · Codex-assisted audit · 3 November 2026

Draft case study for review.

## What I wanted to learn

I wanted to know whether the curriculum already assesses decisions an independent creative might face when a company changes hands or a new distribution opportunity appears.

## How I used Codex

I used Codex to trace the learner path from lesson to capstone to “Check your work” at a pinned repository revision. We inspected the rubric, classroom code and tests, separating what learners self-check from what the software verifies.

## What the audit found

- The rubric assesses a production-documentation package. Its rights criterion includes tracking the master recording and composition. Learners score twelve areas from 0–2, with a 20/24 pass threshold and stop conditions.
- The classroom simulation checks roles, permissions and state transitions. It does not grade a learner’s interpretation of a music agreement.
- Passing the rubric does not demonstrate that a learner can interpret an older grant for a new use, explain the effect of an acquisition, or compare a buyback price with plausible reuse income.

## What the evidence supports

Keep the current rubric as the baseline. If those outcomes become required, propose a fictional grant and transaction packet for the existing exercise and take it through the [existing professional and educator feedback issue #80](https://github.com/ibloud/50-ways-to-leave-another/issues/80). This audit identifies a possible next step; it does not change the curriculum.

## Verification limits

The learner path was checked locally. Public rendering and feedback delivery were unverified. The audit did not establish learner outcomes, legal clearance, or facts about any artist’s private contract or buyback.

## Sources

Prepared from the completed Codex-assisted audit report. All file links below use the audit baseline: [ibloud/50-ways-to-leave-another · 508b297](https://github.com/ibloud/50-ways-to-leave-another/commit/508b2971ac7e9967adfb06a234fa1c509fbe82f4).

- [Capstone assignment](https://github.com/ibloud/50-ways-to-leave-another/blob/508b2971ac7e9967adfb06a234fa1c509fbe82f4/exercises/fictional-capstone.md#L7-L22)
- [Exact rubric and pass conditions](https://github.com/ibloud/50-ways-to-leave-another/blob/508b2971ac7e9967adfb06a234fa1c509fbe82f4/ASSESSMENT-RUBRIC.md#L3-L20)
- [Rights-envelope template](https://github.com/ibloud/50-ways-to-leave-another/blob/508b2971ac7e9967adfb06a234fa1c509fbe82f4/templates/rights-envelope.md#L21-L50)
- [Classroom case and illustrative response](https://github.com/ibloud/50-ways-to-leave-another/blob/508b2971ac7e9967adfb06a234fa1c509fbe82f4/pixie/classroom/index.html#L9-L37)
- [Classroom permission logic](https://github.com/ibloud/50-ways-to-leave-another/blob/508b2971ac7e9967adfb06a234fa1c509fbe82f4/pixie/classroom/index.js#L10-L22)
- [Classroom regression tests](https://github.com/ibloud/50-ways-to-leave-another/blob/508b2971ac7e9967adfb06a234fa1c509fbe82f4/pixie/classroom/index.test.js#L4-L11)
