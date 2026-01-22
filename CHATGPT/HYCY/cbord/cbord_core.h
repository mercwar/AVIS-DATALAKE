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
*/

#ifndef CBORD_CORE_H
#define CBORD_CORE_H

#define AVIS_VERSION "1.0"
#define MERCG_ALLOW 1
#define MERCG_DENY  0

typedef struct {
    const char *CY_NAME;
    const char *CY_TYPE;
    const char *CY_ROLE;
    const char *COMMENT;
} CY_COMMENT_OBJECT;

#define MERCG_FILTER(state) if((state)==MERCG_ALLOW)

#endif
