' In your CYHY Callback
Public Sub Cyhy_Callback(ByVal SigID As Long, ByVal DataPtr As Long, ByVal Size As Long)
    On Error Resume Next ' Datalake Mode: Ignore the trash, find the gems
    
    If SigID = CYHY_SIG_INIT Then
        ' Attempt to render whatever was just injected into the lake
        ' Even if it's a partial frame, GDI+ will try to draw it
        RenderStreamToPictureBox DataPtr, Form1.Picture1
    End If
End Sub
