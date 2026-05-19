---
title: "Training a SentencePiece Model · From Corpus to Tokenizer"
description: "How to train a SentencePiece tokenizer from scratch — data preparation, parameter selection, training a BPE or Unigram model, and evaluating tokenizer quality."
section: "code"
publishDate: "2026-05-15T08:15:00Z"
---

Training a SentencePiece model requires a large, high-quality text corpus. The model learns which subword units to include based on the statistical properties of the training text — garbage in, garbage out.

## Data Preparation

- **Corpus size**: Minimum 1M sentences for a usable tokenizer. 10M+ for production quality. The corpus should be representative of the text the model will see at inference.
- **Preprocessing**: Minimal. SentencePiece handles raw text — no tokenisation, lowercasing, or punctuation removal needed. The model will learn from whatever you give it.
- **Normalization**: SentencePiece can apply NFKC Unicode normalization during training (`normalization_rule_name='nmt_nfkc'`). This standardises Unicode variants but should be applied carefully — it can change character semantics.

## Training (Python API)

```python
import sentencepiece as spm

spm.SentencePieceTrainer.train(
    input='corpus.txt',          # One sentence per line
    model_prefix='spm_model',    # Output prefix
    vocab_size=32000,            # Target vocabulary size
    model_type='unigram',        # 'bpe', 'unigram', 'char', 'word'
    
    # Character coverage
    character_coverage=0.9995,   # Include 99.95% of characters
    
    # Training data sampling
    input_sentence_size=10000000,  # Max sentences to use (10M)
    
    # Special tokens
    user_defined_symbols=['[CLS]', '[SEP]', '[MASK]', '[PAD]'],
    pad_id=3,
    
    # Splitting
    max_sentence_length=4192,     # Maximum sentence length (bytes)
    split_by_whitespace=False,    # SentencePiece handles whitespace as character
)
```

## Evaluating Quality

**Fertility**: Average number of subword tokens per word. Lower = better. Typically 1.2–1.5 for English, 1.5–2.0 for morphologically rich languages (Turkish, Finnish, Hungarian).

**Coverage**: Proportion of test corpus tokens that exist in the vocabulary (vs. being split into sub-tokens). Higher = better. Should approach 100% with `character_coverage=0.9995`.

**Linguistic coherence**: Qualitative evaluation — do tokens correspond to meaningful morphemes? "playing" → "play" + "ing" is good. "playing" → "pl" + "ay" + "ing" is poor.

## Common Mistakes

- **Too small a corpus**: Produces a tokenizer overtuned to the training data. Rare words in production data become excessively fragmented.
- **Wrong `character_coverage`**: 0.9995 is standard for production. Lower values (0.98) are for prototyping. 1.0 encodes every rare Unicode character, inflating the vocabulary with near-useless tokens.
- **Ignoring special tokens**: Always include control tokens in the vocabulary during training — not after.
