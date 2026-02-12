section .text
    global run_asm_logic
    extern fire_end_entry

run_asm_logic:
    ; EDI = 32-bit GUID
    ; 1. [INJECT]: Copy [UNINSTALL] from KB to living fire-gem.ini
    ; 2. [MANUAL TRIGGER]: Start BIN executor
    call fire_end_entry
    ret

section .note.GNU-stack noalloc noexec nowrite progbits
