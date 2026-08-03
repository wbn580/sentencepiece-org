---
title: "SentencePiece · A Lossless, Language-Agnostic Tokenizer"
description: "A deep dive into SentencePiece — how it works, the difference between BPE and Unigram models, why it outperforms word-level tokenizers, and its role in modern LLM pipelines."
section: "concept"
publishDate: "2026-05-15T05:10:00Z"
readingTime: 11
tags: ["sentencepiece", "tokenization", "bpe", "unigram", "nlp"]
references:
  - title: "Kudo, T. & Richardson, J. (2018). SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing. EMNLP."
    url: "https://arxiv.org/abs/1808.06226"
---

SentencePiece is a subword tokenizer developed at Google, released in 2018 by Taku Kudo and John Richardson. It addressed a persistent problem in NLP: word-level tokenizers break on out-of-vocabulary words, character-level tokenizers generate excessively long sequences, and existing subword tokenizers (BPE, WordPiece) assumed whitespace-delimited text — an assumption that fails for Japanese, Chinese, Thai, and many other languages.

## The Core Innovation: Lossless Tokenization

SentencePiece's key insight is **lossless tokenization**. It treats the input text as a raw Unicode string, without assuming whitespace as a word delimiter. Spaces are treated as ordinary characters (encoded as a special meta-symbol `_`, U+2581), and the entire tokenization process is reversible without ambiguity.

### Why Whitespace Assumption Fails

In English, tokenizing by splitting on spaces is a reasonable first step:
```
The cat sat on the mat.
→ ["The", "cat", "sat", "on", "the", "mat", "."]
```

In Japanese, where words are not separated by spaces, this fails:
```
今日はいい天気です
→ Word-level: meaningless unless you have a morphological analyzer
→ Character-level: ["今", "日", "は", "い", "い", "天", "気", "で", "す"] (too long)
→ SentencePiece: ["_今日", "は", "_いい", "_天気", "です"] (semantically meaningful subwords)
```

SentencePiece's subword approach works by learning which character sequences tend to co-occur in the training data, producing tokens that are linguistically meaningful without requiring pre-tokenization.

## Two Models: BPE and Unigram

SentencePiece supports two subword segmentation algorithms:

### Byte-Pair Encoding (BPE)

BPE starts with individual characters as the vocabulary and iteratively merges the most frequent adjacent pair:

1. Initialize vocabulary with all unique characters in the training corpus
2. Count all adjacent token pairs
3. Merge the most frequent pair into a new token
4. Repeat until target vocabulary size is reached

**BPE Example**:

```
Step 1: ["l", "o", "w", "l", "o", "w", "e", "r", "n", "e", "w", "e", "s", "t"]
Step 2: The pair ("l", "o") appears 2 times in "low" → merge to "lo"
Step 3: ("lo", "w") appears 2 times → merge to "low"
...
Final: ["low", "lower", "new", "est"]
```

BPE is deterministic for encoding: a greedy algorithm always picks the longest matching token. However, it may produce multiple token sequences that represent the same text (different segmentations are possible), requiring careful implementation for consistency.

### Unigram Language Model

The Unigram model takes a probabilistic approach:

1. Start with a large seed vocabulary (e.g., all substrings up to length L)
2. Train a unigram language model: each token has a probability, and the probability of a tokenization is the product of its token probabilities
3. For each token, compute the loss increase if it were removed from the vocabulary
4. Remove the tokens with the smallest loss increase
5. Repeat until target vocabulary size is reached

The Unigram model produces a **probability distribution** over all possible tokenizations, selecting the most probable one (Viterbi decoding) at inference time.

### BPE vs Unigram: When to Use Which

- **Training speed**: Faster · Slower (iterative pruning)
- **Tokenization quality**: Good · Slightly better (probabilistic)
- **Multiple segmentations**: Possible · Probabilistic, most likely chosen
- **Used by**: GPT-2, RoBERTa, LLaMA · ALBERT, T5, XLNet, mBART


Both are supported by SentencePiece. In practice, the choice matters less than the vocabulary size and training data, but Unigram tends to produce slightly more linguistically meaningful segmentations.

## Vocabulary Size

SentencePiece's vocabulary size is specified at training time. Common values:

- **LLaMA 2**: 32,000 · SentencePiece BPE
- **T5**: 32,128 · SentencePiece Unigram
- **mBART**: 250,000 · SentencePiece Unigram
- **XLM-R**: 250,000 · SentencePiece Unigram


Multilingual models use larger vocabularies to cover the writing systems of many languages. A 32K vocabulary works well for English; 250K is typical for models covering 100+ languages.

## Character Coverage and Fallback

SentencePiece handles out-of-vocabulary characters through **character-level fallback**: any character not in the vocabulary is encoded as its Unicode byte sequence. This ensures that even arbitrary Unicode (emojis, rare CJK characters, mathematical symbols) can be encoded without error — a crucial property for models deployed in the wild.

## Implementation and Usage

SentencePiece is a C++ library with Python bindings. Training a model:

```python
import sentencepiece as spm

spm.SentencePieceTrainer.train(
    input='corpus.txt',
    model_prefix='m',
    vocab_size=32000,
    model_type='bpe',  # or 'unigram'
    character_coverage=0.9995,
    input_sentence_size=10000000
)

# Load and use
sp = spm.SentencePieceProcessor()
sp.load('m.model')

tokens = sp.encode('Hello world!', out_type=str)
# ['▁H', 'e', 'l', 'l', 'o', '▁w', 'or', 'l', 'd', '!']
```

The `▁` (U+2581, lower one-eighth block) represents a space. In SentencePiece output, `▁` at the beginning of a token means that token follows a space in the original text. This allows reversible detokenization: concatenating tokens and replacing `▁` with spaces recovers the exact original text.

## SentencePiece in Modern LLM Pipelines

SentencePiece has become the de facto tokenization standard for large language models. LLaMA, Mistral, and many open-source models use SentencePiece BPE. The T5 family and most multilingual models use SentencePiece Unigram.

The library's efficiency — sub-millisecond tokenization on CPU, C++ implementation with no Python overhead at inference — makes it suitable for production deployment at scale. Combined with its lossless property and language agnosticism, it offers a robust foundation for tokenization in any text processing pipeline.

[^1]: Kudo, T. & Richardson, J. (2018). SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing. *Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing (EMNLP)*, 4299-4304.
