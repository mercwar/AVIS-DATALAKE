; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .text
    global _start       ; THE NEW ENTRY POINT
    extern fire_end_entry

_start:
    ; 1. Ingest GUID from Stack (passed via BASH)
    pop rdi             ; Get argc
    pop rsi             ; Get program name
    pop rdx             ; This is our 32-bit GUID argument

    ; 2. PROVISIONING: Copy KB Install Shield to Disk
    ; 3. INJECTION: Append [UNINSTALL] to fire-gem.ini

    ; 4. MANUAL TRIGGER: Call the Binary Executor
    call fire_end_entry

    ; 5. EXIT: System Call to close the process
    mov rax, 60         ; sys_exit
    xor rdi, rdi        ; status 0
    syscall

section .note.GNU-stack noalloc noexec nowrite progbits
