---
title: "Special Tokens · [CLS], [SEP], [PAD], [MASK] and Beyond"
description: "How special tokens work in NLP tokenization — the role of control tokens in BERT, GPT, and T5 models, and how to configure them correctly."
section: "code"
publishDate: "2026-05-15T08:15:00Z"
---

Special tokens are control characters in the tokenizer vocabulary that serve structural and functional roles. They are not part of natural language text but are essential for model operation.

## Common Special Tokens

| Token | Purpose | Used By |
|---|---|---|
| `[CLS]` | Classification token — representation of entire sequence | BERT |
| `[SEP]` | Separator between segments/sentences | BERT |
| `[PAD]` | Padding to equalise sequence lengths in a batch | All models |
| `[MASK]` | Masked token for masked language modeling | BERT, RoBERTa |
| `[UNK]` | Unknown token — fallback for out-of-vocabulary | Older models |
| `<s>` / `</s>` | Beginning/end of sequence (BOS/EOS) | LLaMA, T5, GPT |
| `<unk>` | Unknown token (SentencePiece convention) | SentencePiece models |
| `<pad>` | Padding token | SentencePiece models |
| `[INST]` | Instruction marker | LLaMA instruction-tuned |

## Configuration

Special tokens must be in the vocabulary **during tokenizer training**, not added afterwards. Adding a new special token to an existing tokenizer requires resizing the model's embedding matrix — which either adds randomly initialised parameters (unreliable) or requires retraining.

## ID Assignment

Token IDs matter for some model architectures:
- **PAD token ID** = 0 (convention for attention masking — 0 gets masked by default in most implementations)
- **BOS/EOS token ID**: May be the same (SentencePiece: both are `</s>` and have ID 1) or different (GPT: `<|endoftext|>` is BOS and EOS, same ID)
- **UNK token ID**: Should not exist in modern tokenizers (BPE/Unigram/WordPiece handle OOV by subword decomposition). An UNK token appearing in output indicates a problem

## The UNK Problem

If your tokenizer produces `[UNK]` tokens at inference, something is wrong:
- SentencePiece with `character_coverage=0.9995`: rare characters fall back to UTF-8 bytes, not UNK
- Byte-level BPE (GPT): zero UNK by construction (base vocabulary is bytes)
- WordPiece (BERT): `[UNK]` is present but should rarely appear with adequate vocabulary size

UNK tokens in production indicate the tokenizer was trained on insufficient data or with inadequate character coverage.
