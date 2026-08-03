---
title: "Normalization in Tokenization · NFKC, Lowercasing, and Unicode"
description: "How text normalisation affects tokenization — Unicode normalisation forms, the case folding debate, and when normalisation helps vs hurts model performance."
section: "concept"
publishDate: "2026-05-15T08:20:00Z"
---

Text normalisation is the pre-tokenization step that standardises text into a consistent form. It's a double-edged sword: too much normalisation destroys information; too little produces inconsistent tokenization.

SentencePiece defaults: NFKC normalisation + no lowercasing. NFKC (Normalization Form Compatibility Composition) converts compatibility characters (e.g., fullwidth Latin Ａ→A, superscripts, fractions ½→1⁄2) to their canonical forms. This ensures "ABC" and "ＡＢＣ" tokenize identically. Lowercasing: Case information carries semantic meaning ("Apple" company vs "apple" fruit). Modern tokenizers typically preserve case and let the model learn when it matters. Models trained on lowercased text (older BERT variants) lose this distinction.

The most impactful normalisation decision: do you normalise at all? Raw text keeps everything. NFKC standardises Unicode but can change character meanings (the Angstrom sign Å and Swedish letter Å normalise differently — NFKC can change Swedish text). For models deployed globally, minimal normalisation (or none) is safest.
