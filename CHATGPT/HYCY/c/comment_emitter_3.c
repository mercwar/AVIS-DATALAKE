/* AIFVS-ARTIFACT
   CY_NAME: C_COMMENT_EMITTER_3
   CY_TYPE: Logic
   CY_ROLE: Metadata Serializer
   CY_LINK: AVIS-DATALAKE://C/EMITTER/3

   DL_MAP: CY_COMMENT_OBJECT
   DL_DRV: PELLESC13
   DL_LDIR: c
   DL_FILE: comment_emitter_3
   DL_EXT: .c

   AVIS_SCHEMA: CGO_v1
   AVIS_VISIBILITY: Public

   COMMENT:
   This library writes comment objects to disk.
*/

#include <stdio.h>
#include "../cbord/cbord_core.h"

void emit_comment_3(const CY_COMMENT_OBJECT *obj, const char *path) {
    FILE *f = fopen(path, "w");
    if(!f) return;
    fprintf(f, "CY_NAME=%s\nCY_TYPE=%s\nCY_ROLE=%s\nCOMMENT=%s\n",
        obj->CY_NAME, obj->CY_TYPE, obj->CY_ROLE, obj->COMMENT);
    fclose(f);
}
