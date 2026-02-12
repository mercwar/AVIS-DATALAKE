section .text
    global run_asm_logic
    extern fire_end_entry

run_asm_logic:
    ; EDI now contains the 32-bit GUID
    ; [PROVISIONING]: Copy KB files and inject [UNINSTALL] block
    
    call fire_end_entry
    ret

section .note.GNU-stack noalloc noexec nowrite progbits
