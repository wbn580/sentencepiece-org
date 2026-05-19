---
title: "Vocabulary Size in Tokenization · How Many Tokens is Optimal?"
description: "How vocabulary size affects tokenizer performance — the tradeoff between vocabulary size, sequence length, model embedding parameters, and multilingual coverage."
section: "concept"
publishDate: "2026-05-15T08:10:00Z"
---

Vocabulary size is the most consequential hyperparameter in subword tokenization. It directly affects the model's embedding matrix size ($V \times d_{model}$) and the average sequence length. Choosing the right size is a tradeoff with no universal optimum.

## The Tradeoff

**Small vocabulary (8K–16K)**: Short sequences (frequent words are single tokens), but OOV handling is aggressive — rare words split into many subwords. Embedding matrix is small. Example: Early transformer models (Vaswani et al., 2017: 37K for English-German).

**Medium vocabulary (32K–50K)**: The "sweet spot" for monolingual English models. Most common words are single tokens. Rare words split into 2–3 subwords. LLaMA (32K), Mistral (32K), early GPT-2 (50K).

**Large vocabulary (100K–250K)**: Necessary for multilingual models. Allocates tokens across writing systems (Latin, CJK, Arabic, Devanagari, Cyrillic). Average sequence length is shorter (fewer subword splits), but the embedding matrix is significantly larger. GPT-4 (~100K), mBART (250K), XLM-R (250K).

## The Embedding Matrix Cost

With $d_{model} = 4096$, a 32K vocabulary embedding matrix is 32K × 4096 = 131M parameters. A 250K vocabulary matrix is 250K × 4096 = 1B parameters — over 7× larger, just for the input and output embeddings. This is a significant fraction of total model parameters for smaller models.

## Multilingual Considerations

A 32K vocabulary trained on English only will allocate nearly all tokens to the Latin script. Japanese, Chinese, and Korean text will be split excessively. A 250K vocabulary can allocate 10–30K tokens to each major writing system. The tradeoff: the model has to learn embeddings for all tokens in all languages, increasing training data requirements.

## Choosing Vocabulary Size

- **English-only, small model (<7B params)**: 32K
- **English-only, large model**: 32K–50K
- **Multilingual, covering 10+ languages**: 50K–100K
- **Multilingual, covering 100+ languages**: 100K–250K
- **Code-heavy / mathematical**: Larger (100K+) — allocates tokens to operators, keywords, identifiers
