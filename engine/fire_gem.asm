; ==========================================================
; ENGINE: fire_gem.asm (Hardware Forge Edition)
; PURPOSE: Hardware Init -> Parse JSON -> ASM Forge -> Exec
; ==========================================================
section .data
    nasm_path db "/usr/bin/nasm", 0
    ld_path   db "/usr/bin/ld", 0
    
    ; FORGE ARGS: Direct register-to-hardware handoff
    nasm_arg0 db "nasm", 0
    nasm_arg1 db "-f", 0
    nasm_arg2 db "elf64", 0
    nasm_arg3 db "engine/kb_processor.asm", 0
    nasm_arg4 db "-o", 0
    nasm_arg5 db "engine/kb_processor.o", 0
    
    ld_arg0   db "ld", 0
    ld_arg1   db "engine/kb_processor.o", 0
    ld_arg2   db "-o", 0
    ld_arg3   db "engine/kb_processor", 0

section .text
    global _start

_start:
    ; 1. HARDWARE INIT: 16-byte Stack Alignment
    mov rbp, rsp
    and rsp, -16

    ; 2. CALL NASM (sys_execve 0x3B)
    ; In a real takeover, we would fork, but here we chain.
    mov rax, 59         ; sys_execve
    mov rdi, nasm_path
    
    ; Setup argv for NASM
    push 0              ; NULL terminator
    push nasm_arg5
    push nasm_arg4
    push nasm_arg3
    push nasm_arg2
    push nasm_arg1
    push nasm_arg0
    mov rsi, rsp
    xor rdx, rdx        ; No env
    syscall

    ; --- Note: Once execve hits, the process image is replaced ---
    ; To do NASM then LD then EXEC, we would use sys_fork. 
    ; For the first KB, we use the "Static Forge" logic.
