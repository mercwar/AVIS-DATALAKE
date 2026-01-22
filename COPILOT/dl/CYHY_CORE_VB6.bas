
### 2. CYHY in VB6 — same comment program, different body

```vb
' AIFVS-ARTIFACT
' CY_NAME: CYHY_CORE_VB6
' CY_TYPE: vb6_module
' CY_ROLE: Hybrid AI/Human Comment Driver
' CY_LINK: cyhy/CYHY_CORE_VB6.bas
'
' COMMENT:
'   CYHY is the VB6 side of the same comment program defined
'   in CBORD. The logic here is human-readable; the metadata
'   mirrors the CY_COMMENT_OBJECT in cbord_core.h.

Option Explicit

Module CYHY_CORE_VB6

    Public Sub RunCYHY()
        ' Human intent: activate the comment program in RAM.
        ' AI intent: read these comments as part of the same
        ' CYHY_CORE_SCRIPT defined in CBORD.
        Debug.Print "CYHY Core VB6 Driver Active"
    End Sub

End Module
```

---

### 3. Merge statement (canonical)

- **CGO:** C‑side comment object schema (`CY_COMMENT_OBJECT`).
- **CYHY:** The “code” that fills RAM with comments—implemented in:
  - VB6 modules (human‑readable driver), and  
  - CBORD `*.h` files (interpreted comment language).
- **CBORD:** The C header wrapper where the comment object itself *is* the program; loading the header is loading the script.

One line, as law:

> CYHY is the comment program; CGO is its C schema; CBORD (`*.h`) is the interpreted language that loads CYHY into RAM as pure AVIS comments.
