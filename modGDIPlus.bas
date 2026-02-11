Option Explicit

' --- GDI+ Startup Types ---
Private Type GdiplusStartupInput
    GdiplusVersion           As Long
    DebugEventCallback       As Long
    SuppressBackgroundThread As Long
    SuppressExternalCodecs   As Long
End Type

' --- Core API Declarations ---
Private Declare Function GdiplusStartup Lib "gdiplus" (Token As Long, inputbuf As GdiplusStartupInput, Optional ByVal outputbuf As Long = 0) As Long
Private Declare Sub GdiplusShutdown Lib "gdiplus" (ByVal Token As Long)
Public Declare Function GdipCreateFromHDC Lib "gdiplus" (ByVal hdc As Long, hGraphics As Long) As Long
Public Declare Function GdipDeleteGraphics Lib "gdiplus" (ByVal hGraphics As Long) As Long
Public Declare Function GdipDisposeImage Lib "gdiplus" (ByVal image As Long) As Long

Private GdipToken As Long

' --- Initialize GDI+ Engine ---
Public Sub GDIPlus_Start()
    Dim GdipInput As GdiplusStartupInput
    GdipInput.GdiplusVersion = 1
    If GdiplusStartup(GdipToken, GdipInput) <> 0 Then
        MsgBox "FATAL: GDI+ Engine failed to ignite!", vbCritical, "AVIS ERROR"
    End If
End Sub

' --- Shutdown GDI+ Engine ---
Public Sub GDIPlus_Stop()
    If GdipToken <> 0 Then
        GdiplusShutdown GdipToken
        GdipToken = 0
    End If
End Sub
