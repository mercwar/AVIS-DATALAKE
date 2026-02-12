; ==========================================================
; ENGINE: fire_gem.asm (PIC / SO COMPATIBLE)
; ==========================================================
section .data
    target_key db '"target": "', 0
    key_len equ 11

section .bss
    buffer resb 4096
    path_tmp resb 256

section .text
    global _start

_start:
    ; 1. HARDWARE INIT: RIP-Relative Positioning
    ; We use [rel ...] to satisfy the linker for .so creation
    pop rax             ; argc
    pop rax             ; prog_name
    pop rdi             ; rdi = config file

    ; 2. OPEN (sys_open)
    mov rax, 2
    xor rsi, rsi
    syscall
    mov r12, rax

    ; 3. READ into RIP-Relative Buffer
    mov rax, 0
    mov rdi, r12
    lea rsi, [rel buffer] ; THE FIX: Load relative address
    mov rdx, 4096
    syscall

    ; 4. SCAN AND BUILD
    lea rsi, [rel buffer]
find_target:
    lea rdi, [rel target_key]
    mov rcx, key_len
    push rsi
    repe cmpsb
    pop rsi
    je extract_and_mkdir
    inc rsi
    cmp rsi, buffer + 4000
    jl find_target
    jmp exit

extract_and_mkdir:
    add rsi, key_len
    lea rdi, [rel path_tmp] ; THE FIX: Load relative address
copy_path:
    mov al, [rsi]
    cmp al, '"'
    je do_mkdir
    mov [rdi], al
    inc rsi
    inc rdi
    jmp copy_path

do_mkdir:
    mov byte [rdi], 0
    mov rax, 83         ; sys_mkdir
    lea rdi, [rel path_tmp]
    mov rsi, 0755
    syscall
    jmp find_target

exit:
    mov rax, 60
    xor rdi, rdi
    syscall
