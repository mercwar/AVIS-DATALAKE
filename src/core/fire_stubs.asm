; src/core/fire_stubs.asm
section .text
    global fire_bgin
    global cyhy_signal

; Signals the FireGem to begin writing unzipped KB data
fire_bgin:
    mov rbx, 0x7000     ; Fire Sector Base
    mov byte [rbx], 0xFB ; Hex for 'Fire Begin'
    ret

; Signals a CYHY log state based on input CSV/XML params
cyhy_signal:
    mov rbx, 0x5000     ; CYHY Sector Base
    mov byte [rbx], 0xC1 ; Hex for 'Cyhy'
    ret
