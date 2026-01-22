/* AIFVS-ARTIFACT
   CY_NAME: CGO_COMMENT_SCHEMA
   CY_TYPE: Schema
   CY_ROLE: Canonical Comment Object
   CY_LINK: AVIS-DATALAKE://CGO/COMMENT

   DL_MAP: CY_COMMENT_OBJECT
   DL_DRV: CGO
   DL_LDIR: schema
   DL_FILE: CGO_comment
   DL_EXT: .h

   AVIS_SCHEMA: CGO_v1
   AVIS_VISIBILITY: Public

   COMMENT:
   This struct mirrors comment logic for C systems.
*/

typedef struct {
    const char *CY_NAME;
    const char *CY_TYPE;
    const char *CY_ROLE;
    const char *COMMENT;
} CGO_COMMENT_OBJECT;
