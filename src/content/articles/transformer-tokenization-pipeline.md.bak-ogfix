---
title: "Transformer Tokenization · How Tokens Become Embeddings"
description: "The path from text to model input — tokenization, token IDs, embedding lookup, positional encoding, and attention masking in the transformer pipeline."
section: "concept"
publishDate: "2026-05-15T08:15:00Z"
---

Tokenization is the first step in the transformer pipeline, but tokens are not what the model processes. The full pipeline: text → tokens → token IDs → embeddings → transformer layers → output.

## Step 1: Tokenization

Text → list of token strings.
"The cat sat" → ["The", " cat", " sat"]

## Step 2: Token ID Lookup

Each token maps to an integer ID through the tokenizer's vocabulary.
["The", " cat", " sat"] → [464, 3797, 3332]

## Step 3: Embedding Lookup

Token IDs index into the embedding matrix $W_e \in \mathbb{R}^{V \times d_{model}}$. Each row is a learned vector.
[464, 3797, 3332] → three $d_{model}$-dimensional vectors.

## Step 4: Positional Encoding

Add position information (sine/cosine functions or learned position embeddings) so the model knows token order. This is added to the token embeddings before the first transformer layer.

## Step 5: Attention Masking

Padding tokens (`[PAD]`) are masked in the attention computation (attention weight = -∞ before softmax, effectively zero after). This prevents the model from attending to padding positions.

## Step 6: Transformer Layers

Self-attention + feedforward layers process the embedded sequence.

## Step 7: Output

The final hidden state at each position passes through a linear layer + softmax to predict the next token (or to produce a classification logit at the `[CLS]` position).

## Token Count Implications

GPT-4 charges per token (input + output). Understanding tokenization helps optimise costs: "The cat sat on the mat" = 6 tokens. The same meaning in Chinese might be 8–15 tokens depending on the tokenizer. Using verbose English descriptions when a concise equivalent exists incurs unnecessary cost.
