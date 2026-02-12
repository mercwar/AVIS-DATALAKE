; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global run_asm_logic
    extern fire_end_entry ; Manual trigger link

run_asm_logic:
    ; RDI = GUID (passed from C)
    ; 1. [SYNC]: Copy installation files from KB to fire-gem/
    ; 2. [INJECT]: Copy [UNINSTALL] section from KB to living fire-gem.ini
    
    ; 3. [MANUAL TRIGGER]: Call fire-end.asm to process BIN commands
    call fire_end_entry
    ret
