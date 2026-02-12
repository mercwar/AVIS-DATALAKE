; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global run_asm_logic

run_asm_logic:
    ; The C engine will pass the Run GUID to a register (e.g., RDI)
    ; Validate the GUID before proceeding with hardware initialization
    cmp rdi, 0x827364A1 ; Verification of the GUID's first segment
    jne abort_install
    
    ; Proceed with installation commands
    ret

abort_install:
    mov rax, 60         ; sys_exit
    mov rdi, 1          ; Error code
    syscall
