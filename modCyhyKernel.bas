' Standard Module: modCyhyKernel.bas
Option Explicit

' CYHY ABI Callback
Public Function Cyhy_Callback(ByVal SigID As Long, ByVal DataPtr As Long, ByVal Size As Long) As Long
    Select Case SigID
        Case CYHY_SIG_RENDER
            ' The C-Loader sent a render signal
            Form1.RenderWebViewToPictureBox
        Case CYHY_SIG_CAPTURE
            ' The CapturePreview is ready on disk/memory
            Form1.UpdateDisplay
    End Select
    Cyhy_Callback = 0 ' S_OK
End Function
