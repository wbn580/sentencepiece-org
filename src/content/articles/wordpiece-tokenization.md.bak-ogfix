---
title: "WordPiece Tokenization · Google's Subword Algorithm"
description: "How WordPiece tokenization works — the likelihood-based merge criterion, the ## prefix for continuation tokens, its use in BERT, and comparison with BPE."
section: "concept"
publishDate: "2026-05-15T08:15:00Z"
---

WordPiece (Schuster & Nakajima, 2012; refined by Wu et al., 2016) is the tokenization algorithm used by BERT and its derivatives. It is similar to BPE but differs in its merge criterion — WordPiece optimises likelihood rather than frequency.

## How It Works

1. Start with individual characters as the vocabulary
2. Train a language model on the training data with the current vocabulary
3. For each candidate pair (A, B), compute: score = count(AB) / (count(A) × count(B))
4. Merge the pair with the highest score
5. Repeat until target vocabulary size

The key difference from BPE: BPE merges by frequency (count(AB)), WordPiece merges by **likelihood improvement**. The score measures how much more likely AB is together than separately. This favours pairs that form linguistically coherent units — "un" + "##iversity" scores higher than "uni" + "versity" because "un" appears before many prefixes but "##iversity" almost exclusively follows "un".

## The ## Prefix

WordPiece uses a ## prefix on tokens that continue from a previous token (not at the start of a word). "playing" → "play" + "##ing". This distinguishes word-initial and word-internal occurrences of the same character sequence — "un" (at start of "unlikely") and "##un" (in the middle of "re##un##ion") are different tokens.

## WordPiece vs BPE

- **Merge criterion**: Likelihood score · Frequency
- **Continuation tokens**: Yes (## prefix) · No (in standard BPE)
- **Used by**: BERT, DistilBERT, ELECTRA · GPT, LLaMA, RoBERTa
- **Training speed**: Comparable · Slightly faster


## Implementation

The original WordPiece was proprietary (Google internal). An open-source implementation is available in the `tokenizers` library (HuggingFace). SentencePiece implements BPE and Unigram, not WordPiece — to use WordPiece, use the `tokenizers` library or `transformers.AutoTokenizer`.
