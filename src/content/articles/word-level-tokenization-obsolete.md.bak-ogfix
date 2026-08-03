---
title: "Word-Level Tokenization · Why It's Obsolete in Modern NLP"
description: "Why word-level tokenization has been replaced by subword methods — the OOV problem, vocabulary explosion, and comparison with modern subword approaches."
section: "compare"
publishDate: "2026-05-15T08:25:00Z"
---
Word-level tokenization (each unique word = one token) was standard in NLP before 2016. It has been almost entirely replaced by subword methods.

Problems: (1) OOV: Any word not in the training vocabulary is mapped to `[UNK]`. With a 100K vocabulary, rare words (technical terms, names, typos, new coinages) are all `[UNK]` — and an NLP model can't do anything useful with `[UNK]`. (2) Vocabulary explosion: To reach 99% coverage of English web text needs ~500K word types. For morphologically rich languages (Turkish, Finnish), the combinatorial explosion of word forms means millions of word types. (3) No morphological generalisation: "run", "running", "ran" are completely independent tokens — the model must learn their similarity from scratch.

Subword tokenization solves all three: OOV → decompose into subwords ("unfriendliness" → "un" + "friend" + "li" + "ness"), vocabulary size → 8K–250K subwords cover effectively all text, morphological generalisation → common morphemes (prefixes, suffixes, roots) are shared across related words.

Word-level tokenization survives only in niche domains: keyword-based search (Elasticsearch), traditional text classification (TfidfVectorizer), and some production systems where simplicity is valued over accuracy.
