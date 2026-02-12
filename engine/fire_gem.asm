; ==========================================================
; ENGINE: fire_gem.asm (The Igniter)
; PURPOSE: Detect KB and Handover to Processor
; ==========================================================
section .data
    kb_file db "kb.kb", 0
    proc_bin db "./kb_processor", 0

section .text
    global _start

_start:
    ; 1. Hardware Sync
    mov rbp, rsp
    and rsp, -16

    ; 2. Check for Fuel (kb.kb)
    mov rax, 21         ; sys_access
    mov rdi, kb_file
    mov rsi, 0          ; F_OK
    syscall
    test rax, rax
    jnz exit            ; No KB, no spark.

    ; 3. Handover to Processor (execve)
    mov rax, 59         ; sys_execve
    mov rdi, proc_bin
    
    push 0              ; NULL env
    push kb_file        ; argv[1] = kb.kb
    push proc_bin       ; argv[0] = processor
    mov rsi, rsp
    xor rdx, rdx
    syscall

exit:
    mov rax, 60         ; sys_exit
    xor rdi, rdi
    syscall
