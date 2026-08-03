---
title: "Tokenization in Information Retrieval · Search, TF-IDF, BM25"
description: "How tokenization works in information retrieval systems — the differences from NLP tokenization, stemming, stopword removal, and why subword tokenizers aren't always better for search."
section: "compare"
publishDate: "2026-05-15T08:25:00Z"
---
Tokenization for search is fundamentally different from tokenization for neural models. Search prioritises recall (finding all relevant documents), while NLP prioritises semantic understanding.

Search tokenization typically includes: lowercasing (query "Apple" should match document "apple"), stemming/lemmatisation (reducing "running"→"run" so a query for "run" matches "running"), stopword removal ("the", "a", "is" removed to reduce index size), character n-grams (partial matching for typos: "hel" "ell" "llo" for "hello").

Subword tokenization (BPE, WordPiece) is not directly applicable to BM25/TF-IDF search because these models operate on term frequencies, not embeddings. A search query for "university" would need to match documents containing any of the subwords "un" + "iversity" — which is non-trivial to implement in an inverted index without treating each subword as a separate index term.

For modern hybrid search (BM25 + dense embeddings), two separate tokenization pipelines are used: BM25 uses traditional search tokenization; the neural encoder uses subword tokenization.
