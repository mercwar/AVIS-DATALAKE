; ==========================================================
; ENGINE: fire-gem.asm (Full Control / FVS Handoff)
; AUTHOR: CVBGOD Logic
; ==========================================================
section .data
    shell db '/bin/bash', 0
    arg_c db '-c', 0
    
    ; COORDINATE RESOLUTION:
    ; Pulls the target directory and the Stub launch command from the INI.
    ; This preserves the "s o s" spaces via the file-to-memory stream.
    fvs_logic db "eval \$(grep 'next_dir=' '$1' | cut -d'=' -f2 | tr -d '\"')/gemini_stub.sh", 0

section .text
    global _start

_start:
    ; 1. HARDWARE SYNC: Align Stack to 16-byte boundary
    mov rbp, rsp
    and rsp, -16

    ; 2. ACQUIRE INI: Address passed in R8 via the SH Forge
    pop rax             ; argc
    pop rax             ; program name
    pop r8              ; r8 = path to ../../fire-gem.ini

    ; 3. VALIDATE & HANDOVER
    ; We use sys_execve to replace this ASM process with the Stub logic.
    ; The 'fvs_logic' ensures the shell only sees the resolved, spaced path.
    mov rax, 59         ; sys_execve (0x3B)
    mov rdi, shell
    
    push 0              ; NULL env
    push r8             ; $1 = The INI coordinate
    push fvs_logic      ; $0 = The Stub Launch Pattern
    push arg_c          ; -c flag
    push shell          ; bash
    mov rsi, rsp        ; Argv pointer
    xor rdx, rdx        ; Clear environment
    syscall

    ; 4. FAIL-SAFE: If execve fails, halt the CPU
    mov rax, 60         ; sys_exit
    mov rdi, 1
    syscall
