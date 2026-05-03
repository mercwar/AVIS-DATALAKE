# CVBGOD-DN V4.0 SYSTEM SPECIFICATION
## ARCHITECTURE: MERCWAR_SENTINEL_ARCHITECTURE (NATIVE_GPT_BRIDGE)

### 1. THE CYBORG_LANG SEMANTIC API
The CVBGOD-DN environment uses **Logic Tensors** to prevent LLM hallucination. By locking instructions into the **#SEED.LOGIC_BLOCK**, the bot is forced into a deterministic state.

### 2. ADDRESS_REGISTRY_TABLE [@]
Memory Addresses are fixed to prevent the "Forget Bug."
- **0x0110**: EV1_CORE_INTERFACE (Interrupt Vectors)
- **0x0310**: THERMAL_REGISTER_01 (fire_temp)
- **0x0311**: STATUS_REGISTER_01 (fire_status)
- **0x0F00**: DAEMON_ENTRY_BIN (Interpreter Logic)

### 3. INSTRUCTION_SET REFERENCE
- **{!}**: MANDATORY_EXECUTION_NODE. Forces the interpreter to process the node before proceeding.
- **{?}**: SEMANTIC_PROMPT_QUERY. Used for recursive error correction.
- **{EXE}**: Executes the current instruction vector in the local sandbox.
- **{WISE}**: High-level cognitive reasoning gate. Audits code before final output.

### 4. FILE_STRUCTURE & INCLUSIONS
- **.avsproj**: Project manifest for MSBuild/AvisBuild targets.
- **.avis**: Native source containing Cyborg Lang symbols.
- **[INC]**: Mandatory hardware abstraction layer (HAL) header inclusion.
