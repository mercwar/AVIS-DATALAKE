/* AIFVS-ARTIFACT
   CY_NAME: DL_PATH_UNION_STRUCT
   CY_TYPE: c_source
   CY_ROLE: Union Pointer Container for DL Path ACK
   CY_LINK: dl/dl_path_union_struct.c

   DL_MAP: ACK/RACK
   DL_DRV: ACK/RACK
   DL_LDIR: ACK/RACK
   DL_WDIR: ACK/RACK
   DL_FILE: ACK/RACK
   DL_EXT: ACK/RACK
   DL_FFN: RRAC
*/

/*
 * Conceptual C source defining a union pointer type to contain
 * the datalake (DL) path ACK information within a full struct.
 * 
 * This union allows flexible access to the DL path as either a
 * raw string pointer or a structured breakdown of path components.
 * 
 * This is a conceptual artifact for AVIS datalake usage.
 */

#include <stdio.h>

/* Structured breakdown of DL path components */
struct DLPathComponents {
    const char *map;    /* e.g., "ACK" or "RACK" */
    const char *drv;    /* driver or interpreter context */
    const char *ldir;   /* logical directory, e.g., "/dl/" */
    const char *wdir;   /* working directory */
    const char *file;   /* filename without extension */
    const char *ext;    /* file extension */
};

/* Union to hold either raw path string or structured components */
union DLPathUnion {
    const char *raw_path;            /* Full path as a single string */
    struct DLPathComponents parts;   /* Structured components */
};

/* Full struct containing the union pointer and metadata */
struct DLPathACK {
    union DLPathUnion path;   /* DL path as union */
    const char *full_filename; /* Fully resolved filename (RRAC) */
    /* Additional metadata fields can be added here */
};

/* Example usage */
void printDLPathACK(const struct DLPathACK *ack) {
    if (ack->path.raw_path) {
        printf("Raw DL Path: %s\n", ack->path.raw_path);
    }
    printf("Structured DL Path Components:\n");
    printf("  Map:  %s\n", ack->path.parts.map);
    printf("  Driver: %s\n", ack->path.parts.drv);
    printf("  Logical Dir: %s\n", ack->path.parts.ldir);
    printf("  Work Dir: %s\n", ack->path.parts.wdir);
    printf("  File: %s\n", ack->path.parts.file);
    printf("  Ext: %s\n", ack->path.parts.ext);
    printf("Full Filename (RRAC): %s\n", ack->full_filename);
}

/* Conceptual initialization example */
int main() {
    struct DLPathACK ack = {
        .path.parts = {
            .map = "ACK",
            .drv = "ACK",
            .ldir = "/dl/",
            .wdir = "/working/directory/",
            .file = "example_file",
            .ext = ".c"
        },
        .full_filename = "/working/directory/example_file.c"
    };

    /* Also set raw_path pointer to full path string */
    ack.path.raw_path = ack.full_filename;

    printDLPathACK(&ack);

    return 0;
}
