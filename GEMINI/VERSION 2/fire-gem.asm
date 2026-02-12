; ==========================================================
; ENGINE: fire-gem.asm (AVIS-DATALAKE / GEMINI / VERSION 2)
; ==========================================================
section .data
    shell db '/bin/bash', 0
    arg_c db '-c', 0
    ; Logic: Extract run_cmd from the blueprint and execute
    cmd_parse db "eval \$(grep 'run_cmd=' '%s' | cut -d'=' -f2)", 0

section .text
    global _start

_start:
    pop rax             ; argc
    cmp rax, 2
    jl exit_halt        ; Fail if no KB path provided
    pop rax             ; prog name
    pop r8              ; r8 = Pointer to AVIS-DATALAKE/.../kb.kb

    ; SYSCALL: execve to trigger the command inside the KB
    mov rax, 59         ; sys_execve
    mov rdi, shell
    
    push 0              ; NULL env
    push r8             ; Pass KB path to grep
    push arg_c
    push shell
    mov rsi, rsp
    xor rdx, rdx        ; No env
    syscall

exit_halt:
    mov rax, 60         ; sys_exit
    xor rdi, rdi
    syscall
