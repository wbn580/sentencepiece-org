---
title: "Tokenization for Multilingual NLP · Challenges and Solutions"
description: "How tokenization handles multiple languages — script-specific challenges, the CJK problem, vocabulary allocation across writing systems, and the byte-fallback approach."
section: "concept"
publishDate: "2026-05-15T08:15:00Z"
---

Multilingual tokenization is fundamentally harder than monolingual tokenization. A 32K vocabulary sufficient for English is grossly inadequate for languages that use different writing systems. This article surveys the challenges and current solutions.

## The CJK Problem

Chinese, Japanese, and Korean present a tokenization challenge that doesn't exist for alphabetic scripts:
- Chinese has 50,000+ characters (3,000–5,000 common)
- Japanese uses three scripts (kanji, hiragana, katakana) + Latin characters
- Korean Hangul characters combine into syllable blocks

A BPE tokenizer trained on English will represent each CJK character as multiple bytes, producing 3–8 tokens per character. A Chinese sentence that takes 20 tokens in a dedicated tokenizer becomes 80+ tokens in an English-centric tokenizer — inflating sequence length and inference cost by 4×.

## Solutions

**Large multilingual vocabularies** (100K–250K): Allocate tokens to major writing systems proportionally. XLM-R (250K vocabulary) handles 100 languages reasonably well. Tradeoff: large embedding matrix.

**Language-specific tokenizers**: Train separate tokenizers per language (or per script group). Used by some multilingual model architectures but complicates the model — you need to know the language in advance or use language detection.

**Byte-level fallback**: Any character not in the vocabulary is encoded as its UTF-8 bytes. GPT-2 used byte-level BPE (base vocabulary is bytes, 256 tokens, extended to 50K). Ensures no OOV characters but inflates sequence length for non-Latin scripts.

## Current Best Practice

SentencePiece Unigram with a large vocabulary (100K–250K), trained on a balanced multilingual corpus, with byte-fallback for rare characters. Used by mBART, XLM-R, NLLB, and most production multilingual models.
