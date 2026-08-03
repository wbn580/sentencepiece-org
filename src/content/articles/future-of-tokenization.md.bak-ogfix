---
title: "The Future of Tokenization · Beyond BPE and Unigram"
description: "Emerging tokenization research — learned tokenization, differentiable tokenizers, vision-inspired approaches, and whether tokenizers will survive the next generation of models."
section: "papers"
publishDate: "2026-05-15T08:30:00Z"
---

Three research directions are challenging the BPE/Unigram paradigm:

(1) **Learned tokenization**: Instead of training a tokenizer separately from the model, make tokenization part of the model and train end-to-end. MANTa (2024) uses gradient-based token boundaries. The model learns which character sequences to group into tokens, optimised for the downstream task rather than raw frequency.

(2) **Byte-level models**: Process raw bytes, no tokenizer at all. MegaByte (2023) uses a hierarchical transformer with a byte-level local model and a patch-level global model. SpaceByte (2024) optimises byte-level processing for efficiency. As transformer architectures move beyond quadratic attention, byte-level models become computationally viable.

(3) **Vision-inspired approaches**: Patch-based processing (like ViT for images) applied to text. Characters are grouped into fixed-size "patches" without learning a vocabulary. This eliminates the tokenizer entirely — the model processes raw character patches.

The most likely future: tokenizers will survive for the next 2–3 years (all major LLM providers are committed to their existing tokenizers) but will be progressively replaced by byte-level or patch-based approaches as attention architectures evolve. Tokenization is a pre-neural hack that works — but it won't be with us forever.
