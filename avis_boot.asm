format PE GUI 4.0
entry start

include 'win32a.inc'

section '.text' code readable executable

start:
    ; 1. Locate our own image base
    invoke  GetModuleHandle, 0
    mov     ebp, eax                ; EBP = ImageBase

    ; 2. Validate AVIS Magic Signature (Offset 00h)
    mov     eax, [ebp]
    cmp     eax, 'AVIS'             ; 41 56 49 53
    jne     .error_exit

    ; 3. Extract ENTRY_OFFSET from AVIS Header (Offset 0Ch)
    mov     edx, [ebp + 0Ch]        ; EDX = Offset to MERC-G Table
    add     edx, ebp                ; EDX = Absolute Address of VTable

    ; 4. Parse MERC-G Table to find CORE_C (Lane ID 101)
    ; VEC_COUNT is at [edx]
    mov     ecx, [edx]              ; ECX = Number of Lanes
    add     edx, 4                  ; EDX points to first Lane Entry

.search_loop:
    cmp     ecx, 0
    je      .error_exit
    
    ; Check Lane Name (Offset 10h into Entry) for "CORE_C"
    mov     eax, [edx + 10h]        ; First 4 bytes of name
    cmp     eax, 'CORE'
    jne     .next_lane
    
    ; 5. Found CORE_C -> Extract ENTRY_PTR and JUMP
    mov     eax, [edx + 08h]        ; EAX = PTR to Loader Code
    add     eax, ebp                ; EAX = Absolute address
    jmp     eax                     ; Ignite the C-Loader

.next_lane:
    add     edx, 30h                ; Move to next 48-byte MERC-G Entry
    dec     ecx
    jmp     .search_loop

.error_exit:
    invoke  MessageBox, 0, _err_msg, _err_title, MB_ICONERROR
    invoke  ExitProcess, 0

section '.data' data readable writeable
    _err_title db 'AVIS BOOT ERROR', 0
    _err_msg   db 'MERC-G Core Entry not found. Firegem ignition failed.', 0

section '.import' import data readable
    library kernel32,'KERNEL32.DLL', user32,'USER32.DLL'
    import kernel32, GetModuleHandle,'GetModuleHandleA', ExitProcess,'ExitProcess'
    import user32, MessageBox,'MessageBoxA'
