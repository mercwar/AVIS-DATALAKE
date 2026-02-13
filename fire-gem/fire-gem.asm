section .data
    msg db "Hello", 0xA  ; The string and a newline
    len equ $ - msg      ; Calculate length automatically

section .text
    global _start

_start:
    ; 1. SYS_WRITE: Print "Hello" to stdout
    mov rax, 1           ; [write] syscall ID
    mov rdi, 1           ; [stdout] file descriptor
    mov rsi, msg         ; pointer to string
    mov rdx, len         ; length of string
    syscall

    ; 2. SYS_EXIT: Close the program
    mov rax, 60          ; [exit] syscall ID
    xor rdi, rdi         ; status 0
    syscall
