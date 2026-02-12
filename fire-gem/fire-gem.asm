; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global _start           ; Standard Entry for 'ld'
    global run_asm_logic    ; Exported for the .so
    extern fire_end_entry   ; Located in fire-end.asm

_start:
    ; 1. Ingest GUID from the Stack (passed via BASH)
    ; Stack on entry: [argc] [argv[0]] [argv[1]]
    pop r8                  ; argc
    pop r8                  ; argv[0] (program name)
    pop rdi                 ; argv[1] (This is our 32-bit GUID)

    call run_asm_logic

    ; 5. EXIT
    mov rax, 60             ; sys_exit
    xor rdi, rdi
    syscall

run_asm_logic:
    ; RDI contains the GUID
    ; [PROVISIONING]: Sync KB and inject [UNINSTALL] to fire-gem.ini
    call fire_end_entry
    ret

section .note.GNU-stack noalloc noexec nowrite progbits
