section .text
    global fire_end_entry  ; This MUST be global for the linker to see it

fire_end_entry:
    ; Binary command logic (0x01 - 0x08)
    ret
