; ==========================================================
; ENGINE: fire_gem.asm (Direct JSON-to-Mkdir)
; PURPOSE: Hardware-level directory manifestation
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
    ; 1. OPEN JSON
    pop rax             ; argc
    pop rax             ; prog_name
    pop rdi             ; rdi = fire_gem_config.json
    mov rax, 2          ; sys_open
    xor rsi, rsi        ; O_RDONLY
    syscall
    mov r12, rax        ; Save FD

    ; 2. READ JSON INTO BUFFER
    mov rax, 0          ; sys_read
    mov rdi, r12
    mov rsi, buffer
    mov rdx, 4096
    syscall
    test rax, rax
    jle exit

    ; 3. SCAN AND BUILD
    lea rsi, [buffer]
find_target:
    ; Look for the "target": " sequence
    mov rdi, target_key
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
    lea rdi, [path_tmp]
copy_path:
    mov al, [rsi]
    cmp al, '"'         ; End of path string
    je do_mkdir
    mov [rdi], al
    inc rsi
    inc rdi
    jmp copy_path

do_mkdir:
    mov byte [rdi], 0   ; Null terminate
    ; PHYSICAL MANIFESTATION
    mov rax, 83         ; sys_mkdir
    lea rdi, [path_tmp]
    mov rsi, 0755
    syscall
    
    ; Loop back for next target
    jmp find_target

exit:
    mov rax, 60         ; sys_exit
    xor rdi, rdi
    syscall
