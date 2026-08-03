---
title: "Tokenizer Libraries · SentencePiece, HuggingFace Tokenizers, tiktoken"
description: "A comparison of the major tokenizer libraries — SentencePiece, HuggingFace tokenizers, tiktoken (OpenAI), and when to use each."
section: "code"
publishDate: "2026-05-15T08:20:00Z"
---

Three tokenizer libraries dominate NLP production pipelines. Each serves different use cases.

**SentencePiece** (Google, C++ with Python bindings): Implements BPE and Unigram. Language-agnostic, lossless. The default for training from scratch (LLaMA, T5, mBART). Best for building a new tokenizer for a new model.

**HuggingFace Tokenizers** (Rust with Python bindings): Implements BPE, WordPiece, Unigram. Extremely fast (tokenizes GB of text per second on CPU). Deep integration with the HuggingFace ecosystem. Best for working with existing pretrained models that use HuggingFace-compatible tokenizers.

**tiktoken** (OpenAI, pure Python with Rust core): Byte-level BPE implementation. Used by GPT-3, GPT-4, and OpenAI API models. Best for counting tokens for OpenAI API pricing or building applications on top of OpenAI models.

Practical guidance: Use SentencePiece to train a new tokenizer. Use HuggingFace tokenizers for fast inference with pretrained models. Use tiktoken for OpenAI-specific token counting (key for API cost estimation).
