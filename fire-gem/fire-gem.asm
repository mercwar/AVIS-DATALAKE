; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global run_asm_logic
    extern fire_end_entry ; The manual trigger link

run_asm_logic:
    ; RDI = guid_val (passed from C)
    
    ; 1. [SYNC]: Copy drivers/stubs from KB to living_dir
    ; 2. [INJECT]: Copy [UNINSTALL] from KB Master to fire-gem.ini on disk
    
    ; 3. [MANUAL TRIGGER]: Jump to fire-end.asm before returning
    call fire_end_entry
    ret
