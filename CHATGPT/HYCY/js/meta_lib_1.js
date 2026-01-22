/* AIFVS-ARTIFACT
   CY_NAME: JS_META_LIB_1
   CY_TYPE: Logic
   CY_ROLE: Metadata Transport
   CY_LINK: AVIS-DATALAKE://JS/LIB/1

   DL_MAP: CY_COMMENT_OBJECT
   DL_DRV: JAVASCRIPT
   DL_LDIR: js
   DL_FILE: meta_lib_1
   DL_EXT: .js

   AVIS_SCHEMA: CGO_v1
   AVIS_VISIBILITY: Public

   COMMENT:
   JS library moves comment objects as data.
*/

import fs from "fs";

export function writeMeta1(obj, path) {
    fs.writeFileSync(path,
`CY_NAME=${obj.CY_NAME}
CY_TYPE=${obj.CY_TYPE}
CY_ROLE=${obj.CY_ROLE}
COMMENT=${obj.COMMENT}
`);
}
