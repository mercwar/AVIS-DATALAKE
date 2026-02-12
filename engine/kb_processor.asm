; ==========================================================
; ENGINE: kb_processor.asm (Base64 Decoder Edition)
; PURPOSE: Decode kb.kb -> Manifest Datalake
; ==========================================================
section .data
    shell db "/bin/bash", 0
    arg_c db "-c", 0
    ; THE CONVERSION: Decode the Base64 fuel into a live sitemap
    ; then execute the directory/file creation logic.
    logic db "base64 -d kb.kb > sitemap.ini; "
          db "for d in \$(grep 'dir=' sitemap.ini | cut -d'=' -f2); do mkdir -p \$d; done; "
          db "for f in \$(grep 'file=' sitemap.ini | cut -d'=' -f2); do "
          db "p=\$(echo \$f | cut -d':' -f1); c=\$(echo \$f | cut -d':' -f2); "
          db "echo \$c > \$p; done", 0

section .text
    global _start

_start:
    ; 1. Hardware Sync
    mov rbp, rsp
    and rsp, -16

    ; 2. Execute the Decoder & Manifest logic
    mov rax, 59         ; sys_execve
    mov rdi, shell
    
    push 0              ; NULL env
    push logic          ; The logic string
    push arg_c
    push shell
    mov rsi, rsp
    xor rdx, rdx
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
