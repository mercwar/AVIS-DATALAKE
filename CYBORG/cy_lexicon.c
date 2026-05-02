/*
    cy_lexicon.c

    PURPOSE:
        Implementation of the cyborg lexicon model.
*/

#include "cy_lexicon.h"

#include <stdlib.h>
#include <string.h>

static CyString cy_lex_make_string(const char* s) {
    CyString str;
    if (!s) {
        str.data   = NULL;
        str.length = 0;
    } else {
        str.data   = s;
        str.length = (int)strlen(s);
    }
    return str;
}

CyStatus cy_lexicon_init(CyLexicon* lex) {
    if (!lex) return CY_STATUS_ERROR_INVALID_ARGUMENT;
    lex->entries     = NULL;
    lex->entry_count = 0;
    return CY_STATUS_OK;
}

void cy_lexicon_free(CyLexicon* lex) {
    if (!lex) return;
    if (lex->entries) {
        for (int i = 0; i < lex->entry_count; ++i) {
            /* keys and values are const char*; in a real system,
               they might be owned and freed here. */
            (void)lex->entries[i];
        }
        free(lex->entries);
    }
    lex->entries     = NULL;
    lex->entry_count = 0;
}

CyStatus cy_lexicon_add(CyLexicon* lex,
                        const char* key,
                        const char* value,
                        CyLexEntryType type,
                        int weight) {
    if (!lex || !key || !value) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }

    int new_count = lex->entry_count + 1;
    CyLexEntry* new_entries = (CyLexEntry*)realloc(
        lex->entries, sizeof(CyLexEntry) * new_count);
    if (!new_entries) return CY_STATUS_ERROR_INTERNAL;

    lex->entries = new_entries;

    CyLexEntry* e = &lex->entries[lex->entry_count];
    e->key    = cy_lex_make_string(key);
    e->value  = cy_lex_make_string(value);
    e->type   = type;
    e->weight = weight;

    lex->entry_count = new_count;
    return CY_STATUS_OK;
}

CyBool cy_lexicon_lookup(const CyLexicon* lex,
                         const char* key,
                         CyLexEntry* out_entry) {
    if (!lex || !key || !out_entry) return CY_FALSE;

    size_t key_len = strlen(key);
    for (int i = 0; i < lex->entry_count; ++i) {
        const CyLexEntry* e = &lex->entries[i];
        if (e->key.data &&
            e->key.length == (int)key_len &&
            strncmp(e->key.data, key, key_len) == 0) {
            *out_entry = *e;
            return CY_TRUE;
        }
    }
    return CY_FALSE;
}
