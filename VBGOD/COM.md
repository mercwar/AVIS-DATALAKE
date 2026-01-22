# AVIS Comment Interpreter Library

This README documents a multi-language set of canonical comment loaders and metadata handlers designed for the AVIS datalake ecosystem. These components treat source files themselves as executable metadata containers, enabling a transparent, build-free, and runtime-independent metadata flow.

---

## 1️⃣ CBORD — Canonical Comment Interpreter Header

```c
/* AIFVS-ARTIFACT
   CY_NAME: CBORD_CORE
   CY_TYPE: Interpreter
   CY_ROLE: Comment Loader
   CY_LINK: AVIS-DATALAKE://CBORD/CORE

   DL_MAP: CY_COMMENT_OBJECT
   DL_DRV: CBORD
   DL_LDIR: cbord
   DL_FILE: cbord_core
   DL_EXT: .h

   AVIS_SCHEMA: CGO_v1
   AVIS_VISIBILITY: Public

   COMMENT:
   Including this header is execution.
   Comments define the object.
*/

#ifndef CBORD_CORE_H
#define CBORD_CORE_H

#define AVIS_VERSION "1.0"
#define MERCG_ALLOW  1
#define MERCG_DENY   0

typedef struct {
    const char *CY_NAME;
    const char *CY_TYPE;
    const char *CY_ROLE;
    const char *COMMENT;
} CY_COMMENT_OBJECT;

/* MERC-G filter gate */
#define MERCG_FILTER(state) if((state) == MERCG_ALLOW)

#endif


2️⃣ C (Pelles C 13) — Comment Loader → File Emitter

Purpose: load comment metadata and write it to diskCompilation optional. Reading the file is execution.

/* AIFVS-ARTIFACT
   CY_NAME: C_COMMENT_EMITTER
   CY_TYPE: Logic
   CY_ROLE: Metadata Serializer
   CY_LINK: AVIS-DATALAKE://C/EMITTER

   DL_MAP: CY_COMMENT_OBJECT
   DL_DRV: PELLESC13
   DL_LDIR: c
   DL_FILE: comment_emitter
   DL_EXT: .c

   AVIS_SCHEMA: CGO_v1
   AVIS_VISIBILITY: Public

   COMMENT:
   This library writes comment objects to files.
*/

#include <stdio.h>
#include "cbord_core.h"

void emit_comment_object(const CY_COMMENT_OBJECT *obj, const char *path) {
    FILE *f = fopen(path, "w");
    if(!f) return;

    fprintf(f, "CY_NAME=%s\n", obj->CY_NAME);
    fprintf(f, "CY_TYPE=%s\n", obj->CY_TYPE);
    fprintf(f, "CY_ROLE=%s\n", obj->CY_ROLE);
    fprintf(f, "COMMENT=%s\n", obj->COMMENT);

    fclose(f);
}

/* Optional test harness */
#ifdef EMITTER_TEST
int main(void) {
    CY_COMMENT_OBJECT cy = {
        "CYHY_ENV_APP",
        "Driver",
        "Comment Program",
        "Comments are executable logic"
    };

    MERCG_FILTER(MERCG_ALLOW) {
        emit_comment_object(&cy, "cyhy.meta");
    }
    return 0;
}
#endif


3️⃣ VB6 (CYHY) — Human-Readable Comment Program

Purpose: hydrate from ENV + write metadata file

' AIFVS-ARTIFACT
' CY_NAME: CYHY_COMMENT_DRIVER
' CY_TYPE: Driver
' CY_ROLE: Human Comment Program
' CY_LINK: AVIS-DATALAKE://CYHY/VB6
'
' DL_MAP: CY_COMMENT_OBJECT
' DL_DRV: VB6
' DL_LDIR: cyhy
' DL_FILE: CYHY_driver
' DL_EXT: .bas
'
' AVIS_SCHEMA: CGO_v1
' AVIS_VISIBILITY: Public
'
' COMMENT:
' VB6 mirrors comment execution for humans.

Public Sub EmitCYHYMeta(ByVal path As String)
    Dim f As Integer
    f = FreeFile

    Open path For Output As #f
        Print #f, "CY_NAME=CYHY_COMMENT_DRIVER"
        Print #f, "CY_TYPE=Driver"
        Print #f, "CY_ROLE=Human Interface"
        Print #f, "COMMENT=CYHY is the program"
    Close #f
End Sub

Public Sub LoadCYHY()
    Dim mode As String
    mode = Environ$("CYHY_MODE")

    If mode = "MERCG_ALLOW" Then
        Call EmitCYHYMeta("cyhy.meta")
    End If
End Sub


4️⃣ JavaScript — Metadata Reader / Writer

Purpose: treat files as authoritative logic

/* AIFVS-ARTIFACT
   CY_NAME: JS_META_IO
   CY_TYPE: Logic
   CY_ROLE: Metadata Transport
   CY_LINK: AVIS-DATALAKE://JS/META

   DL_MAP: CY_COMMENT_OBJECT
   DL_DRV: JAVASCRIPT
   DL_LDIR: js
   DL_FILE: meta_io
   DL_EXT: .js

   AVIS_SCHEMA: CGO_v1
   AVIS_VISIBILITY: Public

   COMMENT:
   JS does not execute logic.
   It moves comment objects.
*/

import fs from "fs";

export function writeMeta(obj, path) {
    const out =
`CY_NAME=${obj.CY_NAME}
CY_TYPE=${obj.CY_TYPE}
CY_ROLE=${obj.CY_ROLE}
COMMENT=${obj.COMMENT}
`;
    fs.writeFileSync(path, out);
}

export function readMeta(path) {
    return fs.readFileSync(path, "utf8");
}


5️⃣ Perl / CGI — Metadata Sink

Purpose: server-side intake, zero logic

# AIFVS-ARTIFACT
# CY_NAME: PERL_META_SINK
# CY_TYPE: Logic
# CY_ROLE: Metadata Receiver
# CY_LINK: AVIS-DATALAKE://PERL/SINK
#
# DL_MAP: CY_COMMENT_OBJECT
# DL_DRV: PERL
# DL_LDIR: perl
# DL_FILE: meta_sink
# DL_EXT: .pl
#
# AVIS_SCHEMA: CGO_v1
# AVIS_VISIBILITY: Public
#
# COMMENT:
# Perl receives comment objects and stores them.

use strict;
use warnings;

my $output = "received.meta";

open(my $fh, ">", $output) or exit;
while (<STDIN>) {
    print $fh $_;
}
close($fh);

print "OK\n";


🧠 What You Now Have

A comment-loadable library  
Publishable source  
No build system required  
No runtime coupling  
Files themselves are the executable truth  
Server side just reads metadata

This completes AIFVS + MERCG COM object flow.
```
