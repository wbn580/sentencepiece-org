---
title: "Character-Aware Tokenization · Can We Skip Subwords?"
description: "Exploring character-level and character-aware NLP models — CANINE, ByT5, CharFormer, and whether character-level models can replace subword tokenization entirely."
section: "concept"
publishDate: "2026-05-15T08:20:00Z"
---
Subword tokenization dominates NLP, but character-level models offer an alternative: process raw characters (or bytes) directly, eliminating the tokenizer entirely.

Advantages: No vocabulary size tradeoff, no OOV tokens, no tokenizer training, truly language-agnostic, handles typos and code naturally. Disadvantages: Much longer sequences (3–10× longer than subwords, quadratic self-attention cost), harder to learn word-level semantics from characters.

Recent models: CANINE (Google, 2021) uses a hash-based downsampling of character sequences before transformer layers — character-level input, reduced sequence length. ByT5 (Google, 2021) processes UTF-8 bytes directly with a T5 architecture. CharFormer (Tay et al., 2021) uses a gradient-based "soft tokenization" — the model learns to group characters into word-like units internally. These models close the performance gap with subword models while eliminating the tokenizer, but the computational cost remains higher. As transformer architectures evolve beyond quadratic attention (Mamba, RWKV, linear attention), character-level models become more viable.
