; ==========================================================
; ENGINE: kb_processor.asm (The Logic)
; PURPOSE: Ingest KB and Build Datalake
; ==========================================================
section .data
    shell db "/bin/bash", 0
    arg_c db "-c", 0
    ; Sitemap Logic: Parses 'dir=' and 'file=' from the KB
    logic db "for d in \$(grep 'dir=' '$1' | cut -d'=' -f2); do mkdir -p \$d; done; "
          db "for f in \$(grep 'file=' '$1' | cut -d'=' -f2); do "
          db "p=\$(echo \$f | cut -d':' -f1); c=\$(echo \$f | cut -d':' -f2); "
          db "echo \$c > \$p; done", 0

section .text
    global _start

_start:
    ; 1. Acquire KB from Igniter (argv[1])
    pop rax             ; argc
    pop rax             ; bin_name
    pop r8              ; r8 = kb.kb

    ; 2. Manifest Sitemap
    mov rax, 59         ; sys_execve
    mov rdi, shell
    
    push 0              ; NULL env
    push r8             ; $1 for bash
    push logic          ; $0 for bash
    push arg_c
    push shell
    mov rsi, rsp
    xor rdx, rdx
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
