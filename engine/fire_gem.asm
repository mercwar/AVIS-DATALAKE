; ==========================================================
; ENGINE: fire_gem.asm (V4-Zero-Halt)
; ==========================================================
section .data
    mode dw 0755
    target_key db '"target": "', 0

section .bss
    buffer resb 4096
    path_tmp resb 256

section .text
    global _start

_start:
    pop rax             ; argc
    pop rax             ; prog_name
    pop rdi             ; rdi = config file from argv

    ; 1. OPEN
    mov rax, 2          ; sys_open
    xor rsi, rsi        ; O_RDONLY
    syscall
    mov r12, rax

    ; 2. READ & HALT GUARD
    mov rax, 0          ; sys_read
    mov rdi, r12
    mov rsi, buffer
    mov rdx, 4096
    syscall
    test rax, rax
    jle exit            ; IF 0 OR NEGATIVE, SHUTDOWN

    ; 3. DETERMINISTIC BUILD
    ; (Directly targets strings between quotes)
    lea rsi, [buffer]
find_quote:
    cmp byte [rsi], '"'
    je extract_path
    inc rsi
    cmp rsi, buffer + 4096
    jl find_quote
    jmp exit

extract_path:
    add rsi, 11         ; Skip '"target": "'
    mov rdi, path_tmp
copy_loop:
    mov al, [rsi]
    cmp al, '"'
    je build_dir
    mov [rdi], al
    inc rsi
    inc rdi
    jmp copy_loop

build_dir:
    mov byte [rdi], 0   ; Null terminate
    mov rax, 83         ; sys_mkdir
    mov rdi, path_tmp
    mov rsi, 0755
    syscall
    jmp exit            ; Exit after first build for safety

exit:
    mov rax, 60         ; sys_exit
    xor rdi, rdi
    syscall
