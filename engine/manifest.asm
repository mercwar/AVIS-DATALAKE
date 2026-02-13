; ==========================================================
; ENGINE: manifest.asm (CVBGOD V4 MASTER)
; PURPOSE: 4-Byte Header Ingestion -> Direct Manifestation
; ==========================================================
section .data
    shell db "/bin/bash", 0
    arg_c db "-c", 0
    ; The Logic: Ingests kb.bin ($1) -> Extends the chain
    logic db "SZ=$(od -An -N4 -tu4 '$1'); "
          db "HDR=$(dd if='$1' bs=1 skip=4 count=$SZ); "
          db "echo $HDR | jq -c '.[]' | while read i; do "
          db "N=$(echo $i | jq -r '.nest'); F=$(echo $i | jq -r '.file'); "
          db "C=$(echo $i | jq -r '.nest_cmd'); mkdir -p $N; "
          db "dd if='$1' bs=1 skip=$((4 + SZ)) > $N/$F; "
          db "[ \"$C\" != \"null\" ] && eval $(echo $C | sed \"s|%n|$N|g; s|%f|$F|g\"); "
          db "done", 0

section .text
    global _start

_start:
    ; 1. Hardware Sync (16-byte Stack Alignment)
    mov rbp, rsp
    and rsp, -16

    ; 2. Acquire Fuel (kb.bin path passed from YAML in RDI)
    pop rax             ; argc
    pop rax             ; prog_name
    pop r8              ; r8 = path to kb.bin

    ; 3. Execute Manifestation
    mov rax, 59         ; sys_execve
    lea rdi, [rel shell]
    
    push 0              ; NULL env
    push r8             ; $1 = kb.bin
    lea rcx, [rel logic]
    push rcx            ; $0 = logic
    lea rbx, [rel arg_c]
    push rbx
    push rdi
    
    mov rsi, rsp        ; argv
    xor rdx, rdx        ; no envp
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
