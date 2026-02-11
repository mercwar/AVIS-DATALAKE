' Prevents VB6 from trying to paint while GDI+ is drawing
Private Declare Function LockWindowUpdate Lib "user32" (ByVal hwndLock As Long) As Long

' Inside RenderStreamToPictureBox...
LockWindowUpdate pic.hWnd
' ... GDI+ Drawing Logic ...
LockWindowUpdate 0
