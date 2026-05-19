---
title: "OpenAI Tokenizer · tiktoken and the GPT Token Ecosystem"
description: "How OpenAI's tokenizer works — the tiktoken library, cl100k_base encoding, counting tokens for API pricing, and the tokenizer's impact on GPT-4 costs."
section: "code"
publishDate: "2026-05-15T08:25:00Z"
---

OpenAI's `tiktoken` library provides fast BPE tokenization for GPT-3, GPT-3.5, and GPT-4. Its most important practical function: counting tokens to estimate API costs.

```python
import tiktoken

# Load the GPT-4 tokenizer
enc = tiktoken.encoding_for_model("gpt-4")
# or: tiktoken.get_encoding("cl100k_base")

tokens = enc.encode("Hello, world! How are you?")
print(len(tokens))  # 10 tokens

# Decode
print(enc.decode(tokens))  # 'Hello, world! How are you?'
```

Token counting is essential for GPT-4 API budgeting: estimates suggest ~2,000 tokens = roughly 1,500 English words. A 32K context window = ~24,000 words. In practice, the exact ratio depends on content (code has more tokens per word than prose; non-English languages typically have more tokens per word).

GPT-4 uses cl100k_base encoding (100K vocabulary, byte-level BPE). The larger vocabulary compared to LLaMA (32K) means shorter sequences and lower inference cost per word — a deliberate tradeoff (larger embedding matrix, more efficient inference).
