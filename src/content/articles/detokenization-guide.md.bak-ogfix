---
title: "Detokenization · Reconstructing Text from Tokens Losslessly"
description: "How to reverse the tokenization process — the challenges of detokenization, why SentencePiece is lossless, and common detokenization errors."
section: "concept"
publishDate: "2026-05-15T08:15:00Z"
---

Detokenization — converting a sequence of tokens back into readable text — appears trivial but is one of the most common sources of subtle bugs in NLP pipelines. A tokenizer may be lossy (cannot perfectly reconstruct the original text), and different tokenizers handle this differently.

## The Problem

Tokenization can be lossy in several ways:
1. **Whitespace information loss**: "Hello world" and "Hello   world" (three spaces) may tokenize identically if whitespace is not explicitly encoded
2. **Capitalisation ambiguity**: "Apple" (company) and "apple" (fruit) may map to the same token after lowercasing
3. **Punctuation normalisation**: Smart quotes (`""`) vs straight quotes (`""`) vs prime symbols may be normalised identically

## SentencePiece: Lossless by Design

SentencePiece encodes spaces as the meta-character `▁` (U+2581, lower one-eighth block). Detokenization is simply: join all tokens, replace all `▁` with spaces.

```
Tokens: ["▁He", "llo", "▁World", "!"]
Detokenized: He llo World! → "Hello World!"
```

The key insight: `▁` at the beginning of a token means there's a space before that token. "He" has no leading `▁` because it continues from the previous token (the end of "Hello"). "World" has `▁` because there's a space before it.

This system is **lossless**: the original text can be perfectly reconstructed from the token sequence, regardless of language or script.

## BPE Without SentencePiece

Standard BPE implementations (e.g., GPT-2's `tiktoken`) also achieve lossless detokenization by including whitespace as characters in the base vocabulary. "Hello world" → "Hello" + " world" (note leading space). Joining tokens directly reconstructs the original text.

## Common Errors

1. **Double-spacing after punctuation**: Tokenizer produces "Hello" + "," + "▁World". Detokenizer inserts a space after comma because "," token doesn't have trailing space. Solution: post-processing rules ("merge comma + space").
2. **Joining tokens with space**: Simplest approach (`" ".join(tokens)`) is almost always wrong. It adds spaces where none exist and normalises whitespace.
3. **Lowercase normalisation**: If the tokenizer lowercased during training, the original case cannot be recovered during detokenization — information was destroyed.
