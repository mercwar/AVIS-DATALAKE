section .text
    global run_asm_logic
    extern fire_end_entry

run_asm_logic:
    ; RDI = GUID
    ; [Logic: Copy KB drivers to disk]
    ; [Logic: Append [UNINSTALL] from KB to fire-gem.ini]
    
    call fire_end_entry
    ret
