Private Sub Form_Load()
    ' 1. Start GDI+
    GDIPlus_Start
    
    ' 2. Initialize CYHY Callback
    SetCallback AddressOf Cyhy_Callback
    
    ' 3. Configure PictureBox for hDC Rendering
    Picture1.AutoRedraw = True
    Picture1.ScaleMode = vbPixels ' Crucial for GDI+ coordinate matching
End Sub

Private Sub Form_Unload(Cancel As Integer)
    ' Clean up engine
    GDIPlus_Stop
End Sub
