---
title: "BPE vs WordPiece vs Unigram vs SentencePiece · Tokenization Algorithms Compared"
description: "A systematic comparison of four subword tokenization algorithms — how they differ, which models use each one, and the practical trade-offs in vocabulary quality and training speed."
section: "compare"
publishDate: "2026-05-15T05:10:00Z"
readingTime: 8
tags: ["tokenization", "bpe", "wordpiece", "unigram", "comparison"]
---

Four algorithms dominate subword tokenization in modern NLP. They share a common goal — breaking text into subword units that balance vocabulary size against sequence length — but differ in their optimization objectives and training procedures.

## The Four Algorithms

### BPE (Byte-Pair Encoding)

**Origin**: Gage, 1994 (data compression); applied to NLP by Sennrich et al., 2016.

**How it works**: Start with characters, iteratively merge the most frequent adjacent pair.

**Optimization**: Frequency maximization — always merge the most common pair.

**Used by**: GPT-2, RoBERTa, LLaMA, GPT-4.

**Key property**: Deterministic. The same text always tokenizes to the same sequence (greedy longest-match). However, multiple tokenizations can represent the same text during decoding — a minor ambiguity that SentencePiece resolves through its lossless design.

### WordPiece

**Origin**: Schuster & Nakajima, 2012 (Google's voice search); Wu et al., 2016 (Google NMT).

**How it works**: Similar to BPE but uses a likelihood-based criterion for merges. Instead of merging the most frequent pair, WordPiece merges the pair that maximizes the likelihood of the training data.

**Optimization**: Likelihood — merge the pair that most improves the language model probability:

$$
\text{score}(A, B) = \frac{\text{count}(AB)}{\text{count}(A) \cdot \text{count}(B)}
$$

**Used by**: BERT, DistilBERT, ELECTRA.

**Key property**: Tends to produce more linguistically meaningful tokens than BPE because the likelihood criterion favors pairs that form coherent subword units (e.g., "##ing" as a suffix token).

### Unigram Language Model

**Origin**: Kudo, 2018 (SentencePiece).

**How it works**: Start with a large vocabulary of all possible substrings, train a unigram LM, iteratively prune the least useful tokens.

**Optimization**: Minimize the increase in loss when removing a token — effectively maximizing the compression rate under the unigram model.

**Used by**: T5, ALBERT, XLNet, mBART.

**Key property**: Probabilistic — multiple tokenizations are possible for the same text, with the most probable chosen at inference. This naturally handles ambiguities that BPE and WordPiece resolve through deterministic rules.

### SentencePiece (the framework, not the algorithm)

SentencePiece is not a tokenization algorithm itself but a **framework** that implements BPE or Unigram with the additional properties of lossless tokenization, language agnosticism, and whitespace-as-character treatment. When people say "SentencePiece," they usually mean "SentencePiece BPE" or "SentencePiece Unigram" — the underlying algorithm is one of the two.

## Training Efficiency

| Algorithm | Training Time | Memory | Parallelizable |
|---|---|---|---|
| BPE | Fast (merge operations) | Moderate | Limited (iterative) |
| WordPiece | Fast (similar to BPE) | Moderate | Limited |
| Unigram | Slower (iterative pruning) | Higher (seed vocab) | Yes (loss computation per token) |
| SentencePiece BPE | Fast + overhead | Moderate | Limited |
| SentencePiece Unigram | Slower | Higher | Yes |

BPE and WordPiece are simpler and faster to train but may produce less optimal vocabularies. SentencePiece Unigram trades training time for tokenization quality.

## Vocabulary Quality

The quality of a subword tokenizer's vocabulary is measured by:

1. **Fertility**: How many subword tokens are needed per word on average. Lower is better.
2. **Coverage**: What proportion of the test corpus can be encoded using subword tokens (vs character fallback). Higher is better.
3. **Linguistic coherence**: Whether subword units correspond to meaningful morphemes (prefixes, suffixes, roots).

In benchmarks by Domingo et al. (2022), SentencePiece Unigram consistently achieves the lowest fertility (most efficient encoding) across languages, while BPE achieves the highest coverage. WordPiece sits between them on both metrics.

## Choosing an Algorithm

```
Do you need multilingual support?
├── Yes → SentencePiece Unigram (250K vocab, language-agnostic)
└── No → Do you need pretrained model compatibility?
    ├── Yes (LLaMA ecosystem) → SentencePiece BPE (32K vocab)
    ├── Yes (BERT ecosystem) → WordPiece (30K vocab)
    └── No → SentencePiece Unigram (best quality, moderate training cost)
```

The algorithm matters less than the training data and vocabulary size. A BPE tokenizer trained on diverse, high-quality text with a generous vocabulary will outperform a Unigram tokenizer trained on narrow data with a constrained vocabulary. Algorithm choice is a second-order concern relative to data quality.

However, for new model development without ecosystem constraints, SentencePiece Unigram is the current best practice — it produces the most efficient tokenization and handles multilingual text without special handling.
