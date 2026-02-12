; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global run_asm_logic
    extern fire_end_entry ; Points to the other module

run_asm_logic:
    ; 1. [SYNC]: Copy drivers from KB to living_dir
    ; 2. [INJECT]: Copy [UNINSTALL] from KB to fire-gem.ini
    
    ; 3. [MANUAL TRIGGER]: Handoff to fire-end.asm
    call fire_end_entry
    ret

section .note.GNU-stack noalloc noexec nowrite progbits
