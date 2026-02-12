; ==========================================================
; FIREGEM V4 BOOTSTRAP ENGINE
; Purpose: Space-Safe Directory Creation via Syscalls
; ==========================================================
section .data
    mode dw 0755
    space_char db ' '

section .bss
    buffer resb 4096
    path_tmp resb 256

section .text
    global _start

_start:
    ; 1. Hardware Sync
    mov rbp, rsp
    and rsp, -16

    ; 2. Open Config (r8 = path.ini from argv)
    pop rax             ; argc
    pop rax             ; prog_name
    pop r8              ; r8 = path.ini
    
    ; [Logic: Open path.ini -> Find config filename -> Open config]
    ; Simplified for First-KB: Direct open of config
    mov rax, 2          ; sys_open
    mov rdi, config_file ; Hardcoded for Bootstrap
    xor rsi, rsi
    syscall
    mov r12, rax        ; r12 = fd

    ; 3. Read loop
    mov rax, 0          ; sys_read
    mov rdi, r12
    mov rsi, buffer
    mov rdx, 4096
    syscall

    ; 4. Parse NDJSON and Build
    lea rsi, [buffer]
parse_line:
    ; Seek "target":"
    ; ... (Pointer arithmetic to find start of path)
    
    ; Call sys_mkdir (83)
    mov rax, 83
    mov rdi, rsi        ; Extracted path
    mov rsi, [mode]
    syscall

    ; Loop until end of buffer
    jmp parse_line

exit:
    mov rax, 60
    xor rdi, rdi
    syscall

section .data
    config_file db "fire_gem_config.json", 0
