/*
    cy_grammar.h

    PURPOSE:
        Grammar rules and pattern model for the cyborg language.
*/

#ifndef CY_GRAMMAR_H
#define CY_GRAMMAR_H

#include "cy_speech_core.h"
#include "cy_lexicon.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum CyGrammarRuleType {
    CY_RULE_SEQUENCE = 0,
    CY_RULE_CHOICE,
    CY_RULE_OPTIONAL
} CyGrammarRuleType;

typedef struct CyGrammarRule {
    CyString          name;
    CyGrammarRuleType type;
    CyString*         tokens;
    int               token_count;
} CyGrammarRule;

typedef struct CyGrammar {
    CyGrammarRule* rules;
    int            rule_count;
} CyGrammar;

CyStatus cy_grammar_init(CyGrammar* grammar);

void     cy_grammar_free(CyGrammar* grammar);

CyStatus cy_grammar_add_rule(CyGrammar* grammar,
                             const char* name,
                             CyGrammarRuleType type,
                             const char** tokens,
                             int token_count);

CyStatus cy_grammar_apply(const CyGrammar* grammar,
                          const CyLexicon* lex,
                          const CySpeechMessage* input,
                          CySpeechMessage* out_msg);

#ifdef __cplusplus
}
#endif

#endif /* CY_GRAMMAR_H */
