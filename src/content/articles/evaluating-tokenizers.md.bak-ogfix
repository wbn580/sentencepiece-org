---
title: "Evaluating Tokenizers · Intrinsic and Extrinsic Metrics"
description: "How to evaluate tokenizer quality — intrinsic metrics (fertility, coverage, token/word ratio) and extrinsic evaluation through downstream task performance."
section: "math"
publishDate: "2026-05-15T08:15:00Z"
---

A tokenizer's quality affects downstream model performance, but direct evaluation is often skipped in favour of training a model and checking if it works. This article covers metrics for evaluating tokenizers independently.

## Intrinsic Metrics

### Fertility

Average number of tokens per word (or per character for non-segmented languages). Lower = better.

$$ \text{Fertility} = \frac{|\text{tokens}|}{|\text{words}|} $$

A perfect tokenizer has fertility = 1.0 (one token per word). Good English tokenizers: 1.15–1.25. Morphologically rich languages (Turkish): 1.5–2.0.

### Proportion of Single-Token Words

What fraction of words are encoded as single tokens. Higher = better. Related to fertility but more interpretable. A tokenizer where 85% of words are single tokens is clearly better than one where only 60% are.

### Coverage

What fraction of characters in the test set are covered by vocabulary tokens (not byte-fallback or UNK). Should approach 100%. Below 99% indicates insufficient character coverage or training data mismatch.

### Token Length Distribution

Histogram of token lengths (in characters). Bimodal distribution (short function words + longer content words) is expected. Excessively long tail (tokens >15 characters) suggests suboptimal merging.

## Extrinsic Evaluation

Train two identical models with different tokenizers on the same data. Compare downstream performance (perplexity, BLEU, classification accuracy). The model with the lower cross-entropy loss (better language modeling) has the better tokenizer — all else being equal.

## Common Metric Misinterpretation

- **Lower fertility is not always better**: Extremely low fertility (<1.1) suggests the tokenizer is overfitting to the training data vocabulary, memorising rare words as single tokens rather than decomposing them into reusable subword units.
- **Vocabulary size and fertility are coupled**: Larger vocabularies have lower fertility by construction. Normalise fertility comparisons to the same vocabulary size.
- **Cross-linguistic comparison is meaningless**: A fertility of 1.2 for English is normal. A fertility of 1.2 for Turkish would be exceptional (Turkish has rich agglutinative morphology — "evlerimizdekiler" = "those in our houses" is one word).
