---
title: "Custom Tokenizer for Domain-Specific Text · Medical, Legal, Code"
description: "How to train a tokenizer for specialised domains — medical text, legal documents, source code, and the importance of domain-specific training data."
section: "code"
publishDate: "2026-05-15T08:20:00Z"
---
A general-domain tokenizer (trained on Wikipedia + books) performs poorly on specialised text. Medical terms ("pneumonoultramicroscopicsilicovolcanoconiosis") are split into dozens of tokens. Code keywords are decomposed into characters. Domain-specific tokenization reduces sequence length and improves model efficiency.

Training a domain-specific SentencePiece model requires a representative corpus of the target domain. For legal text, use court decisions, legislation, and contracts. For medical, use PubMed abstracts and clinical notes. For code, use GitHub repositories in the target language(s). The vocabulary size can be smaller for narrow domains (16K for legal English vs 32K for general English) because the vocabulary is more repetitive.

Replacing a general tokenizer with a domain one typically reduces fertility by 5–15%, which translates directly to reduced inference cost (fewer tokens = lower cost per input/output).
