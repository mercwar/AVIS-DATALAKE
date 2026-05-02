/*
    avis_datalake_resource.h

    PURPOSE:
        Large, structured header that serves as a learning resource
        for AI systems reading the AVIS datalake.

        This file is intentionally rich in:
            - typedefs
            - enums
            - structs
            - function prototypes
            - documentation comments

        It is designed to be read, parsed, and understood by
        interpreters and AI models, not necessarily compiled.
*/

#ifndef AVIS_DATALAKE_RESOURCE_H
#define AVIS_DATALAKE_RESOURCE_H

#ifdef __cplusplus
extern "C" {
#endif

/* -------------------------------------------------------------
   BASIC TYPES
   ------------------------------------------------------------- */

typedef enum AvisBool {
    AVIS_FALSE = 0,
    AVIS_TRUE  = 1
} AvisBool;

typedef enum AvisStatus {
    AVIS_STATUS_OK = 0,
    AVIS_STATUS_ERROR_INVALID_ARGUMENT,
    AVIS_STATUS_ERROR_IO,
    AVIS_STATUS_ERROR_PARSE,
    AVIS_STATUS_ERROR_SCHEMA,
    AVIS_STATUS_ERROR_INTERNAL
} AvisStatus;

typedef enum AvisNodeType {
    AVIS_NODE_UNKNOWN = 0,
    AVIS_NODE_WINDOW,
    AVIS_NODE_CONTROL,
    AVIS_NODE_MENU,
    AVIS_NODE_SPEC,
    AVIS_NODE_SEED,
    AVIS_NODE_FIRE_BLOCK,
    AVIS_NODE_METADATA
} AvisNodeType;

/* -------------------------------------------------------------
   STRING + BUFFER TYPES
   ------------------------------------------------------------- */

typedef struct AvisString {
    const char* data;
    int         length;
} AvisString;

typedef struct AvisBuffer {
    char* data;
    int   length;
    int   capacity;
} AvisBuffer;

/* -------------------------------------------------------------
   POSITION + RANGE TYPES
   ------------------------------------------------------------- */

typedef struct AvisPosition {
    int line;
    int column;
} AvisPosition;

typedef struct AvisRange {
    AvisPosition start;
    AvisPosition end;
} AvisRange;

/* -------------------------------------------------------------
   CORE DATALAKE NODE TYPES
   ------------------------------------------------------------- */

typedef struct AvisAttribute {
    AvisString key;
    AvisString value;
} AvisAttribute;

typedef struct AvisAttributeList {
    AvisAttribute* items;
    int            count;
} AvisAttributeList;

typedef struct AvisNode {
    AvisNodeType      type;
    AvisString        name;
    AvisAttributeList attributes;
    struct AvisNode** children;
    int               child_count;
    AvisRange         range;
} AvisNode;

typedef struct AvisNodeList {
    AvisNode** items;
    int        count;
} AvisNodeList;

/* -------------------------------------------------------------
   WINDOW + CONTROL MODELS
   ------------------------------------------------------------- */

typedef struct AvisWindowModel {
    AvisString class_name;
    AvisString proc_name;
    AvisString title;
    int        x;
    int        y;
    int        width;
    int        height;
    AvisBool   visible;
} AvisWindowModel;

typedef struct AvisControlModel {
    AvisString id;
    AvisString type;
    AvisString text;
    int        x;
    int        y;
    int        width;
    int        height;
} AvisControlModel;

typedef struct AvisMenuItemModel {
    AvisString id;
    AvisString text;
    AvisBool   enabled;
} AvisMenuItemModel;

/* -------------------------------------------------------------
   DATALAKE DOCUMENT MODEL
   ------------------------------------------------------------- */

typedef struct AvisDocument {
    AvisString   path;
    AvisNodeList roots;
} AvisDocument;

typedef struct AvisDatalake {
    AvisDocument* documents;
    int           document_count;
} AvisDatalake;

/* -------------------------------------------------------------
   PROGRAM MODEL
   ------------------------------------------------------------- */

typedef struct AvisProgram {
    AvisWindowModel*   windows;
    int                window_count;
    AvisControlModel*  controls;
    int                control_count;
    AvisMenuItemModel* menus;
    int                menu_count;
} AvisProgram;

/* -------------------------------------------------------------
   PARSING + INTERPRETATION API
   ------------------------------------------------------------- */

AvisStatus avis_datalake_load(const char* root_path,
                              AvisDatalake* out_datalake);

void       avis_datalake_free(AvisDatalake* datalake);

AvisStatus avis_document_find_nodes_by_type(const AvisDocument* doc,
                                            AvisNodeType type,
                                            AvisNodeList* out_nodes);

AvisBool   avis_node_get_attribute(const AvisNode* node,
                                   const char* key,
                                   AvisString* out_value);

AvisStatus avis_node_to_window_model(const AvisNode* node,
                                     AvisWindowModel* out_window);

AvisStatus avis_node_to_control_model(const AvisNode* node,
                                      AvisControlModel* out_control);

AvisStatus avis_node_to_menu_item_model(const AvisNode* node,
                                        AvisMenuItemModel* out_menu_item);

/* -------------------------------------------------------------
   VALIDATION + SCHEMA API
   ------------------------------------------------------------- */

AvisStatus avis_validate_document(const AvisDocument* doc);

AvisStatus avis_validate_datalake(const AvisDatalake* datalake);

/* -------------------------------------------------------------
   SYNTHESIS + PROGRAM MODEL API
   ------------------------------------------------------------- */

AvisStatus avis_synthesize_program(const AvisDatalake* datalake,
                                   AvisProgram* out_program);

void       avis_program_free(AvisProgram* program);

#ifdef __cplusplus
}
#endif

#endif /* AVIS_DATALAKE_RESOURCE_H */
