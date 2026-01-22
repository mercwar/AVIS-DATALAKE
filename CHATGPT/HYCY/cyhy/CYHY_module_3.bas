' AIFVS-ARTIFACT
' CY_NAME: CYHY_MODULE_3
' CY_TYPE: Driver
' CY_ROLE: Human Comment Program
' CY_LINK: AVIS-DATALAKE://CYHY/MODULE/3
'
' DL_MAP: CY_COMMENT_OBJECT
' DL_DRV: VB6
' DL_LDIR: cyhy
' DL_FILE: CYHY_module_3
' DL_EXT: .bas
'
' AVIS_SCHEMA: CGO_v1
' AVIS_VISIBILITY: Public
'
' COMMENT:
' CYHY module mirrors comment logic for humans.

Public Sub EmitCYHY3(ByVal path As String)
    Dim f As Integer
    f = FreeFile
    Open path For Output As #f
        Print #f, "CY_NAME=CYHY_MODULE_3"
        Print #f, "CY_TYPE=Driver"
        Print #f, "CY_ROLE=Human Interface"
        Print #f, "COMMENT=CYHY module 3 active"
    Close #f
End Sub
