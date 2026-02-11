This **Master Manifest** serves as the definitive index for the `mercwar/AVIS-DATALAKE` repository. It formalizes the **Gemini Version 2** stack, ensuring that any AI or developer accessing the repository understands the relationship between the C-native memory blocks and the interpreted polyglot knowledge base.

---

## FILE: `README.md`

**LOCATION:** `mercwar/AVIS-DATALAKE/GEMINI/VERSION 2/README.md`

# 🧩 AVIS-DATALAKE: GEMINI V2 CORE

**Status:** `STABLE` | **Engine:** `AI.VARIANT.ON` | **Framework:** `MERCWAR`

This directory contains the **Version 2** implementation of the AVIS (AI Visibility & Integration Standard). It is designed to facilitate high-frequency state synchronization between low-level C memory structures and high-level LLM cognitive contexts.

---

## 🏗 System Architecture

The V2 stack is divided into four distinct layers:

### 1. The Hardware/Memory Layer (C-Native)

* **`AIFVS-HEADER.h`**: The source of truth for memory offsets and `DL_RAMD` allocation.
* **`AVIS_RECOVER_V2.c`**: Low-level C-logic for atomic state injection and recovery.

### 2. The Orchestration Layer (YAML)

* **`AVIS-ENV-CONFIG.yml`**: Container and environment variable definitions.
* **`AVIS-VERSION-CONTROL.yml`**: Logic for `.lz4` snapshot retention and AI-driven pruning.
* **`AVIS-INTERPRETER-CONFIG.yml`**: Configuration for the Multi-Language AUI.

### 3. The Knowledge Layer (.AVIS Polyglot)

* **`CORE_LOGIC_V2.avis`**: Cross-language learning artifact embedding C and Python logic.
* **`AVIS-DATALAKE-ROOT.md`**: The interpreted "Map" used by Gemini to navigate the Datalake.

### 4. The Execution Layer (Bash)

* **`AVIS-SYNC-INIT.sh`**: Hot-plugs the engine into the MERCWAR bus.
* **`AVIS-INGEST.sh`**: Triggers the deep-learning sequence for polyglot files.

---

## 🚀 Quick Start (Deployment)

To initialize the V2 environment and ingest the core logic, execute the following from the root:

```bash
# 1. Initialize the Engine and Memory Bridge
chmod +x AVIS-SYNC-INIT.sh && ./AVIS-SYNC-INIT.sh

# 2. Ingest the Polyglot Knowledge Base
chmod +x AVIS-INGEST.sh && ./AVIS-INGEST.sh

```

## 🛡 Security & Resilience

* **Atomic Handshake:** Uses the `ACK/RACK` protocol to prevent partial state writes.
* **State Recovery:** In case of logic drift, use `AVIS_RECOVER_V2` to roll back to the last stable `.lz4` snapshot.
* **Integrity:** All blocks are validated via `CRC32` checksums before LLM ingestion.

---

**Author:** MERCWAR / AVIS Integration Team

**Last Updated:** February 2026

**License:** MERCWAR-PROPRIETARY-V2

---

**The V2 stack is now fully documented and ready for a `git commit`.
