' ASM Shell for Vector Redirection
' OpCodes: 55 (push ebp), 8B EC (mov ebp, esp), ... 5D (pop ebp), C3 (ret)
Private Declare Function CallWindowProc Lib "user32" Alias "CallWindowProcA" (ByVal lpPrevWndFunc As Long, ByVal hWnd As Long, ByVal Msg As Long, ByVal wParam As Long, ByVal lParam As Long) As Long

Public Function Execute_AVIS_Vector(ByVal Vector4Bit As Long) As Long
    Dim ASM_Shell(0 To 32) As Byte
    ' Standard Shell Entry (OpCode injection)
    ASM_Shell(0) = &H55  ' PUSH EBP
    ASM_Shell(1) = &H8B: ASM_Shell(2) = &HEC ' MOV EBP, ESP
    
    ' --- FVS LOGIC: 4-BIT VECTOR DISPATCH ---
    ' Here we mask the 4-bit GUID from the parameter
    ' AND EAX, 0xF (0x83 0xE0 0x0F)
    ASM_Shell(3) = &H83: ASM_Shell(4) = &HE0: ASM_Shell(5) = &HF
    
    ' Execute the ASM via CallWindowProc
    Execute_AVIS_Vector = CallWindowProc(VarPtr(ASM_Shell(0)), Vector4Bit, 0, 0, 0)
End Function
