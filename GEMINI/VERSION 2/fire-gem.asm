extern process_kb

section .text
    global _start

_start:
    ; HARDWARE INIT
    mov rbp, rsp
    and rsp, -16

    ; PROCESS KB COORDINATES
    mov rdi, [rbp + 16] ; Path to kb.kb
    call process_kb     ; Map and validate KB
    
    ; PASS DOWN LINE TO BASH PARSER
    ; sys_execve("/bin/bash", ["/bin/bash", "-c", "grep logic", "kb.kb"], NULL)
    mov rdi, bash_path
    push 0
    push r8             ; $1 = Checked-out KB path
    push grep_logic     ; The grep pattern for run_cmd
    push arg_c
    push bash_path
    mov rsi, rsp
    xor rdx, rdx
    mov rax, 59
    syscall
