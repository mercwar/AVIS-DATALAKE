section .data
    kb_src   db "KB.bin", 0
    fs_dest  db "fire-shield", 0
    log_file db "fire-gem.log", 0
    msg_inst db "[LITTLEBOT] KB.bin detected. Installing Fire-Shield...", 0xA
    msg_len  equ $ - msg_inst
    buffer   times 1024 db 0

section .text
    global _start

_start:
    ; 1. LOG START: Write to fire-gem.log
    mov rax, 2          ; sys_open
    mov rdi, log_file
    mov rsi, 1089       ; O_WRONLY | O_CREAT | O_APPEND
    mov rdx, 0664q
    syscall
    push rax            ; Save log FD

    mov rdi, rax
    mov rax, 1          ; sys_write
    mov rsi, msg_inst
    mov rdx, msg_len
    syscall

    ; 2. OPEN KB.bin (The Source)
    mov rax, 2          ; sys_open
    mov rdi, kb_src
    mov rsi, 0          ; O_RDONLY
    syscall
    mov r8, rax         ; Save Source FD

    ; 3. CREATE fire-shield (The Destination App)
    mov rax, 85         ; sys_creat
    mov rdi, fs_dest
    mov rsi, 0755o      ; rwxr-xr-x
    syscall
    mov r9, rax         ; Save Dest FD

    ; 4. OFFSET: Skip 4-byte header "GEM!"
    mov rax, 8          ; sys_lseek
    mov rdi, r8
    mov rsi, 4
    mov rdx, 0          ; SEEK_SET
    syscall

    ; 5. COPY LOOP (KB -> DISK)
copy_loop:
    mov rax, 0          ; sys_read
    mov rdi, r8
    mov rsi, buffer
    mov rdx, 1024
    syscall
    test rax, rax       ; Check EOF
    jz finalize

    mov rdx, rax        ; Write bytes read
    mov rax, 1          ; sys_write
    mov rdi, r9
    mov rsi, buffer
    syscall
    jmp copy_loop

finalize:
    ; 6. CLOSE ALL
    mov rax, 3          ; sys_close
    mov rdi, r8
    syscall
    mov rdi, r9
    syscall
    pop rdi             ; Get log FD
    syscall

    ; 7. EXECUTE FIRE-SHIELD
    mov rax, 59         ; sys_execve
    mov rdi, fs_dest
    xor rsi, rsi
    xor rdx, rdx
    syscall
