/*
    cy_lexicon.h

    PURPOSE:
        Lexicon and vocabulary model for the cyborg language.
        Teaches how to define dictionaries, entries, and lookup APIs.
*/

#ifndef CY_LEXICON_H
#define CY_LEXICON_H

#include "cy_speech_core.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum CyLexEntryType {
    CY_LEX_ENTRY_WORD = 0,
    CY_LEX_ENTRY_PHRASE,
    CY_LEX_ENTRY_SYMBOL
} CyLexEntryType;

typedef struct CyLexEntry {
    CyString       key;
    CyString       value;
    CyLexEntryType type;
    int            weight;
} CyLexEntry;

typedef struct CyLexicon {
    CyLexEntry* entries;
    int         entry_count;
} CyLexicon;

CyStatus cy_lexicon_init(CyLexicon* lex);

void     cy_lexicon_free(CyLexicon* lex);

CyStatus cy_lexicon_add(CyLexicon* lex,
                        const char* key,
                        const char* value,
                        CyLexEntryType type,
                        int weight);

CyBool   cy_lexicon_lookup(const CyLexicon* lex,
                           const char* key,
                           CyLexEntry* out_entry);

#ifdef __cplusplus
}
#endif

#endif /* CY_LEXICON_H */
