---
title: "Subword Tokenization · Why BPE, WordPiece and Unigram Work"
description: "The theory behind subword tokenization — why character-level is too long, word-level fails on OOV, and subword units achieve an optimal balance of vocabulary size and sequence length."
section: "concept"
publishDate: "2026-05-15T08:10:00Z"
---

Subword tokenization is the foundation of modern NLP. Every large language model relies on it. But why subwords rather than words or characters? The answer lies in a fundamental tradeoff between vocabulary size, sequence length, and the ability to handle unseen words.

## The Vocabulary Problem

**Word-level tokenization**: Vocabulary = all unique words in the training corpus. Vocabulary size: 100K–500K. Problem: out-of-vocabulary (OOV) words are impossible to represent. Any new word, misspelling, or rare term breaks the system.

**Character-level tokenization**: Vocabulary = the character set (26 letters + punctuation + digits). Vocabulary size: ~100. Problem: sequences become extremely long ("hello" = 5 tokens, "internationalisation" = 20). Long sequences increase the computational cost of transformers quadratically.

**Subword tokenization**: Vocabulary = frequent character sequences (subwords). Vocabulary size: 8K–250K. "university" → "uni" + "versity". "university's" → "uni" + "versity" + "'s". The morphological structure is preserved, vocabulary is manageable, and OOV words can be represented as combinations of known subwords.

## The Frequency Principle

Subword tokenization works because language exhibits **Zipfian distribution**: a small number of character sequences account for a large fraction of text. Frequent sequences become tokens; rare sequences decompose into frequent sub-tokens. "the" is always a single token. "xylophone" might be "xylo" + "phone". A randomly-generated nonsense word decomposes into individual characters.

## The Morpheme Hypothesis

Subword tokenization often (but not always) produces morpheme-like units: prefixes ("un-", "re-"), suffixes ("-ing", "-tion"), roots ("bio", "graph"). This is not by design — it's an emergent property of maximising frequency. Morphemes are high-frequency character sequences, so any frequency-based algorithm will discover them. This is why subword tokenization "works" for language — it accidentally recovers morphological structure.
