---
title: "Tokenization and Model Fairness · Bias in Subword Segmentation"
description: "How tokenization choices create bias in language models — the differential treatment of languages, gendered tokenization, and emerging fairness research."
section: "papers"
publishDate: "2026-05-15T08:30:00Z"
---
Research in 2022–2025 revealed that tokenization choices have fairness implications. BPE/Unigram tokenizers trained predominantly on English allocate most vocabulary slots to English subwords, forcing non-English languages into less efficient tokenization. A Vietnamese sentence may require 3–5× more tokens than the equivalent English sentence — directly translating to higher inference cost and worse model performance (longer sequences lose information in the middle of the context window).

Gendered tokenization: Tokenizers trained on biased data may tokenize "actress" as "act" + "ress" (decomposed) while "actor" remains a single token — the model treats these as structurally different, with downstream consequences for gender fairness in generation. Emerging mitigation: vocabulary balancing during tokenizer training; maintaining a minimum allocation of tokens per script/writing system; fairness audits of tokenizer output across demographic groups before model deployment.
