---
title: "Byte-Level BPE · How GPT Tokenization Handles Every Language"
description: "How byte-level BPE works — starting from bytes instead of characters, handling any Unicode input, and the tradeoffs compared to character-level BPE."
section: "concept"
publishDate: "2026-05-15T08:15:00Z"
---

Byte-level BPE (BBPE), introduced by GPT-2 (Radford et al., 2019), takes the logic of BPE to its extreme: the base vocabulary is individual bytes (0–255), not Unicode characters. This guarantees that every possible text — regardless of language, script, or encoding — can be tokenized.

## How It Works

1. Treat the training text as a UTF-8 byte sequence
2. Run standard BPE on bytes (base vocabulary: 256 byte values)
3. Expand vocabulary to 50K by merging frequent byte pairs
4. At inference: UTF-8 encode the text to bytes → BPE tokenize → feed to model

## Advantages

- **Zero OOV**: Every Unicode code point decomposes into 1–4 UTF-8 bytes. No character is ever "unknown."
- **Multilingual by construction**: No need to balance training data across scripts — the byte representation handles any input.
- **Emoji, code, mathematical notation**: All representable without special handling.

## Disadvantages

- **Longer sequences for non-Latin scripts**: A Chinese character like 中 (U+4E2D) encodes to 3 UTF-8 bytes (E4 B8 AD) → 3 tokens. In character-level BPE, it could be 1 token.
- **Less linguistically meaningful tokens**: Byte sequences may split mid-character. The model must learn that bytes E4 B8 AD together represent one character — it typically does, but this adds to the learning burden.
- **Tokenizer mismatch**: A BBPE tokenizer cannot be directly compared to a character-level BPE tokenizer from the same training data — they produce different token sequences.

## GPT Family Adoption

GPT-2, GPT-3, GPT-4: all use byte-level BPE (cl100k_base for GPT-4 with 100K vocabulary). This is why GPT models handle emojis, code, and arbitrary Unicode seamlessly — the byte-level foundation ensures nothing is OOV.
