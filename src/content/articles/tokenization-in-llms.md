---
title: "Tokenization in Large Language Models · LLaMA, GPT, and BERT"
description: "How major LLMs handle tokenization — LLaMA's SentencePiece BPE, GPT-4's tokenizer, BERT's WordPiece, and why tokenization choices affect model performance and behaviour."
section: "compare"
publishDate: "2026-05-15T08:10:00Z"
---

Every large language model begins with a tokenizer — a component that converts text into numbers. Tokenizer choices ripple through the entire model: vocabulary size affects embedding size, tokenization granularity affects how the model "sees" language, and special tokens define the prompt interface.

## LLaMA (Meta, 2023)

**Tokenizer**: SentencePiece BPE, 32K vocabulary.
**Key feature**: Trained primarily on English text. Struggles with non-Latin scripts — CJK characters and Arabic script are often split into individual bytes or characters, increasing sequence length and reducing efficiency for these languages.

## GPT-4 (OpenAI, 2023)

**Tokenizer**: Custom BPE variant (cl100k_base), 100K vocabulary.
**Key feature**: Larger vocabulary than LLaMA. Better multilingual support due to more tokens allocated to non-English scripts. Also handles code more efficiently (common programming keywords are single tokens).

## BERT (Google, 2018)

**Tokenizer**: WordPiece, 30K vocabulary.
**Key feature**: The "##" prefix for continuation tokens ("playing" → "play" + "##ing"). Discriminates between words that start with a space (new word) and those that continue from a previous token (subword). Necessary for the masked language modeling task.

## Practical Implications

**Sequence length efficiency**: A Chinese sentence tokenized by LLaMA's tokenizer produces 2–3× more tokens than GPT-4's tokenizer. This directly impacts inference cost and maximum context window utilisation.

**Instruction following**: Special tokens (`<|im_start|>`, `</s>`, `[INST]`) are tokenizer-specific. A prompt format designed for one model may produce unexpected token sequences with another model's tokenizer.

**Token healing**: When a prompt ends mid-word, the tokenizer can "heal" — the model completes the partial token rather than generating from an unnatural boundary. Not all tokenizers support this cleanly.
