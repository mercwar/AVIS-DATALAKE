; Location: /src/core/fire_writer.asm
; Role: FireGem hardware-emulation writer (Sector 0x7000)

section .text
    global fire_ignite

; fire_ignite(const char* filename [rdi], const char* data [rsi])
fire_ignite:
    ; 1. OPEN FILE: sys_open (RAX=2)
    ; Flags: O_WRONLY|O_CREAT|O_TRUNC (Typically 0x241)
    mov rax, 2          ; sys_open
    mov rdx, 0644o      ; Permissions: -rw-r--r--
    mov rsi, 577        ; O_WRONLY (1) | O_CREAT (64) | O_TRUNC (512)
    syscall             ; Result (File Descriptor) in RAX

    push rax            ; Save file descriptor

    ; 2. SIGNAL FIRE SECTOR (0x7000)
    ; Move 0x01 (FIRE) to emulated RAM sector
    mov rbx, 0x7000     ; Fire Sector Address
    mov byte [rbx], 1   ; Signal: BEGIN FIRE!

    ; 3. WRITE DATA: sys_write (RAX=1)
    ; We need the length of the data first (rsi). 
    ; For Phase 1, we assume data length in rdx is passed or pre-calculated.
    pop rdi             ; Restore file descriptor to rdi
    mov rax, 1          ; sys_write
    ; Note: RSI already contains the data pointer from C
    mov rdx, 4096       ; Max KB Packet size (4KB)
    syscall

    ; 4. CLOSE FILE: sys_close (RAX=3)
    mov rax, 3          ; sys_close
    syscall

    ; 5. END FIRE!
    mov byte [rbx], 0   ; Reset Fire Sector
    ret
