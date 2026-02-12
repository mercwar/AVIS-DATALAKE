; ==========================================================
; ENGINE: fire-gem.asm (AVIS-DATALAKE / GEMINI / VERSION 2)
; ==========================================================
section .data
    shell db '/bin/bash', 0
    arg_c db '-c', 0
    ; Use double-quotes inside the grep to handle the space-contained path
    cmd_parse db "eval \$(grep 'run_cmd=' '%s' | cut -d'=' -f2)", 0
    
    ; Internal Buffer for formatted command
    fmt_cmd times 256 db 0

section .text
    global _start

_start:
    pop rax             ; argc
    cmp rax, 2
    jl exit_halt        
    pop rax             ; prog name
    pop r8              ; r8 = Pointer to AVIS-DATALAKE/GEMINI/VERSION 2/kb.kb

    ; SYSCALL: sys_execve (0x3B)
    mov rax, 59         
    mov rdi, shell
    
    push 0              ; NULL env
    push r8             ; The KB file path
    push arg_c          ; -c flag
    push shell          ; /bin/bash
    mov rsi, rsp        ; Argv array
    xor rdx, rdx        
    syscall

exit_halt:
    mov rax, 60         
    xor rdi, rdi
    syscall
