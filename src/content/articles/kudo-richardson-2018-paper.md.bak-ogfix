---
title: "The Kudo & Richardson 2018 Paper · Original SentencePiece Formulation"
description: "A summary of the SentencePiece EMNLP 2018 paper — the motivation for lossless tokenization, the BPE and Unigram implementations, and the impact on modern NLP."
section: "papers"
publishDate: "2026-05-15T08:20:00Z"
---

The 2018 EMNLP paper "SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing" by Taku Kudo and John Richardson (Google) introduced SentencePiece as a practical solution to two problems: language-dependent pre-tokenization and irreversible tokenization.

**Problem 1**: BPE and WordPiece assumed whitespace-delimited text. Japanese, Chinese, Thai — languages without whitespace word boundaries — required language-specific pre-tokenizers (MeCab, Jieba, ICU). This added complexity and introduced language-dependent errors.

**Problem 2**: Standard tokenization was lossy. Reconstructing the exact original text from tokens was ambiguous — whitespace, capitalisation, and character normalisation decisions by pre-tokenizers were irreversible.

**Solution**: Treat the input as a raw Unicode string. Encode spaces as a meta-character (U+2581). Train BPE or Unigram directly on the character sequence. The result: one tokenizer for all languages, perfectly reversible detokenization.

The paper compared BPE and Unigram on machine translation (WMT, IWSLT datasets) and found Unigram slightly outperformed BPE in BLEU score, while training marginally slower. Over 1,200 citations as of 2026.
