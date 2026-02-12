; AVIS-DATALAKE/fire-gem/fire-gem.asm
section .data
    log_msg  db "[LITTLEBOT] HW Gate Opened. Writing KB to disk...", 0xA
    log_len  equ $ - log_msg
    log_file db "fire-gem.log", 0

section .text
    global _start

_start:
    ; 1. Ingest GUID from Stack
    pop rax                 ; argc
    pop rax                 ; argv[0] (program name)
    pop rdi                 ; argv[1] (The 32-bit GUID)

    ; 2. LITTLEBOT: WRITE TO LOG
    mov rax, 2              ; sys_open
    mov rdi, log_file
    mov rsi, 1025           ; O_WRONLY | O_APPEND
    mov rdx, 0664q          ; permissions
    syscall

    mov rdi, rax            ; file descriptor
    mov rax, 1              ; sys_write
    mov rsi, log_msg
    mov rdx, log_len
    syscall

    ; 3. EXIT
    mov rax, 60             ; sys_exit
    xor rdi, rdi            ; status 0
    syscall

section .note.GNU-stack noalloc noexec nowrite progbits
