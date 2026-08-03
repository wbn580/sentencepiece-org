---
title: "Margin Notes · Building a Tokenization-Aware Application"
description: "Practical guidance for developers building tokenization-aware applications — token counting, prompt budget management, and cost optimisation with tokenizer APIs."
section: "code"
publishDate: "2026-05-15T08:35:00Z"
---

For developers building applications on LLM APIs, understanding tokenization is essential for cost control. Key patterns:

**Token counting**: Always count tokens before sending to API. `tiktoken` for OpenAI, `transformers.AutoTokenizer` for HuggingFace models. Token counting prevents hard API errors (exceeding context window) and allows prompt budget management. In production, implement a retry wrapper that truncates prompts exceeding token limits rather than crashing.

**Prompt budget management**: Reserve tokens for system prompt + user prompt + output. If context window is 8,192 tokens, allocate ~500 for system, ~4,000 for history, ~2,000 for current prompt, ~1,692 for output. Track running token counts across multi-turn conversations.

**Cost optimisation**: Shorter prompts = lower cost. Token counting reveals expensive prompt patterns (unnecessary repetition, verbose system prompts). GPT-4 charges per 1K tokens — reducing system prompt from 400 to 200 tokens saves 20% on every API call. For high-volume applications, token-level cost optimisation is the simplest and most effective cost reduction strategy.
