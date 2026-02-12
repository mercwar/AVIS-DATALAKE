; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global run_asm_logic
    extern fire_end_entry ; Manual trigger to the new file

run_asm_logic:
    ; RDI = GUID (passed from C)
    ; 1. [PROVISION]: Read kb_install_shield.ini [FILES] section
    ; 2. [SYNC]: Copy drivers/stubs to AVIS-DATALAKE/fire-gem/
    ; 3. [INJECT]: Copy [UNINSTALL] from KB into living fire-gem.ini

    ; 4. [MANUAL TRIGGER]: Start fire-end.asm to process BIN commands
    call fire_end_entry
    ret
