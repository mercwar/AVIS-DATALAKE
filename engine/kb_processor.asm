; ==========================================================
; ENGINE: kb_processor.asm (The Binary Architect)
; PURPOSE: Extract KB -> Compile .so -> Upload/Save
; ==========================================================
section .data
    shell db "/bin/bash", 0
    arg_c db "-c", 0
    ; THE MASTER FORGE:
    ; Decodes the massive block, saves the new ASM, and links the .so
    logic db "base64 -d kb.kb > engine/stabilizer.asm; "
          db "nasm -f elf64 engine/stabilizer.asm -o engine/stabilizer.o; "
          db "ld -shared engine/stabilizer.o -o gemini/kb/so/firegem_v4.so; "
          db "echo 'RESTORE POINT CREATED: gemini/kb/so/firegem_v4.so'", 0

section .text
    global _start

_start:
    ; Align Hardware
    mov rbp, rsp
    and rsp, -16

    ; Execute Binary Forge
    mov rax, 59         ; sys_execve
    mov rdi, shell
    push 0
    push logic
    push arg_c
    push shell
    mov rsi, rsp
    xor rdx, rdx
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
