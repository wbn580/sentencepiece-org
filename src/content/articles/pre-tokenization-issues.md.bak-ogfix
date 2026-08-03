---
title: "Pre-tokenization · Why You Shouldn't Split on Whitespace First"
description: "Why whitespace-based pre-tokenization is harmful — how it breaks CJK and other non-segmented languages, and why modern tokenizers (SentencePiece) avoid it."
section: "concept"
publishDate: "2026-05-15T08:20:00Z"
---

Pre-tokenization is the step before subword tokenization where raw text is split into preliminary units — typically words (split on spaces/punctuation). BPE and WordPiece traditionally require pre-tokenization. SentencePiece was designed to eliminate it.

The fundamental problem: pre-tokenization assumes the text can be segmented into words by simple rules (whitespace, punctuation). This assumption holds for English and other alphabetic, space-delimited languages. It fails for Chinese ("今天天气好" is four characters, no spaces), Japanese ("今日はいい天気です" is four words with no spaces), Thai ("สวัสดีครับ" has no spaces between words), and many other languages.

Without language-specific pre-tokenizers (morphological analyzers, dictionary-based segmenters), BPE on pre-tokenized text would treat the entire unsegmented string as one "word" — missing all internal subword structure.

SentencePiece's solution: eliminate pre-tokenization entirely. Spaces become characters in the tokenizer vocabulary (encoded as ▁). The model learns subword units directly from character sequences, regardless of whitespace. This is the key insight of the Kudo & Richardson (2018) paper.
