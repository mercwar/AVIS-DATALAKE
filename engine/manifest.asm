; ==========================================================
; ENGINE: manifest.asm (Cyborg BTS Engine)
; PURPOSE: Read Bin Header -> Extract ASM -> Forge & Exec
; ==========================================================
section .data
    bin_file db "payload.bin", 0
    gen_asm  db "engine/generated.asm", 0
    gen_obj  db "engine/generated.o", 0
    gen_bin  db "engine/generated_bin", 0
    shell    db "/bin/bash", 0
    arg_c    db "-c", 0
    
    ; FORGE LOGIC: Compile the extracted source and execute
    forge_cmd db "nasm -f elf64 engine/generated.asm -o engine/generated.o && "
              db "ld engine/generated.o -o engine/generated_bin && "
              db "./engine/generated_bin", 0

section .bss
    hdr_size resd 1         ; 4-byte header size
    buffer   resb 8192      ; Main processing buffer

section .text
    global _start

_start:
    ; 1. HARDWARE INIT
    mov rbp, rsp
    and rsp, -16

    ; 2. OPEN BINARY PAYLOAD
    mov rax, 2              ; sys_open
    mov rdi, bin_file
    xor rsi, rsi            ; O_RDONLY
    syscall
    mov r12, rax            ; fd

    ; 3. READ 4-BYTE HEADER SIZE
    mov rax, 0              ; sys_read
    mov rdi, r12
    mov rsi, hdr_size
    mov rdx, 4
    syscall

    ; 4. SKIP HEADER (Avis Cyborg Specs) & READ SOURCE
    ; We skip the number of bytes defined in [hdr_size]
    mov eax, [hdr_size]
    mov rdx, rax            ; Length of header to skip
    mov rax, 8              ; sys_lseek
    mov rdi, r12
    mov rsi, rdx            ; Offset (from start)
    add rsi, 4              ; Plus the 4 bytes of size itself
    mov rdx, 0              ; SEEK_SET
    syscall

    ; 5. READ REMAINING ASM SOURCE
    mov rax, 0              ; sys_read
    mov rdi, r12
    mov rsi, buffer
    mov rdx, 8192
    syscall
    mov r13, rax            ; r13 = Size of ASM source

    ; 6. WRITE GENERATED ASM FILE
    mov rax, 2              ; sys_open
    mov rdi, gen_asm
    mov rsi, 65             ; O_CREAT | O_WRONLY
    mov rdx, 0644
    syscall
    mov rdi, rax
    mov rax, 1              ; sys_write
    mov rsi, buffer
    mov rdx, r13
    syscall
    
    ; 7. TRIGGER FORGE (execve bash to compile/run)
    mov rax, 59             ; sys_execve
    mov rdi, shell
    push 0
    push forge_cmd
    push arg_c
    push shell
    mov rsi, rsp
    xor rdx, rdx
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
