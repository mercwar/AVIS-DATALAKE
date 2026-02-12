; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global run_asm_logic
    extern fire_end_entry ; Manual trigger link

run_asm_logic:
    ; RDI contains the GUID passed from C
    ; 1. [PROVISIONING]: Copy drivers from KB to local disk
    ; 2. [INJECT]: Copy [UNINSTALL] from KB into living fire-gem.ini
    
    ; 3. MANUAL TRIGGER: Jump to the final executor
    call fire_end_entry
    ret
