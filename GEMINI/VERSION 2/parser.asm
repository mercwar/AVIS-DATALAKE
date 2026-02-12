; ==========================================================
; ENGINE: parser.asm (KB Processing Module)
; ==========================================================
section .bss
    fd_kb resq 1        ; File descriptor
    kb_size resq 1      ; Size of KB file
    kb_map resq 1       ; Pointer to memory-mapped KB

section .text
    global process_kb

process_kb:
    ; RDI = path to kb.kb
    ; 1. OPEN KB
    mov rax, 2          ; sys_open
    xor rsi, rsi        ; O_RDONLY
    syscall
    mov [fd_kb], rax

    ; 2. GET FILE SIZE (fstat 0x05)
    sub rsp, 144        ; stat buffer
    mov rdi, [fd_kb]
    mov rsi, rsp
    mov rax, 5          ; sys_fstat
    syscall
    mov r8, [rsp + 48]  ; st_size offset
    mov [kb_size], r8
    add rsp, 144

    ; 3. MMAP KB INTO MEMORY
    mov rax, 9          ; sys_mmap
    xor rdi, rdi        ; addr
    mov rsi, [kb_size]  ; length
    mov rdx, 1          ; PROT_READ
    mov r10, 2          ; MAP_PRIVATE
    mov r8, [fd_kb]     ; fd
    xor r9, r9          ; offset
    syscall
    mov [kb_map], rax

    ; 4. SCAN FOR [COMMAND] OFFSET
    ; (Simplified: Returns pointer to start of mapped KB for the bash caller)
    mov rax, [kb_map]
    ret
