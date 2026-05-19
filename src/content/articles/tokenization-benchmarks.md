---
title: "NLP Tokenization Benchmarks · Fertility, BLEU, and Downstream Performance"
description: "How tokenizer choices affect downstream NLP task performance — empirical benchmarks comparing BPE, Unigram, WordPiece, and character-level tokenization."
section: "papers"
publishDate: "2026-05-15T08:35:00Z"
---

Domingo et al. (2022) conducted the most comprehensive tokenizer benchmark to date, comparing 5 tokenization methods across 6 languages and 4 downstream tasks.

Key findings: (1) SentencePiece Unigram achieved the lowest fertility (fewest tokens per word) across all languages. (2) BPE achieved the highest vocabulary coverage. (3) For machine translation (BLEU), the choice of tokenizer had minimal impact (±1 BLEU) — the translation model's architecture and training data dominated. (4) For classification, Unigram and WordPiece slightly outperformed BPE. (5) The practical impact of tokenizer choice is smaller than commonly believed — architectural choices (model size, pretraining data) are far more consequential.

Practical takeaway: spend your time on data quality and model architecture, not tokenizer algorithm selection. SentencePiece Unigram is a safe default. Only change if you have a specific fairness or multilingual efficiency problem.
