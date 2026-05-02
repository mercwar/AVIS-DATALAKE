/*
    cy_grammar.c

    PURPOSE:
        Implementation of the cyborg grammar model.
*/

#include "cy_grammar.h"

#include <stdlib.h>
#include <string.h>

static CyString cy_grammar_make_string(const char* s) {
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

CyStatus cy_grammar_init(CyGrammar* grammar) {
    if (!grammar) return CY_STATUS_ERROR_INVALID_ARGUMENT;
    grammar->rules      = NULL;
    grammar->rule_count = 0;
    return CY_STATUS_OK;
}

void cy_grammar_free(CyGrammar* grammar) {
    if (!grammar) return;
    if (grammar->rules) {
        for (int i = 0; i < grammar->rule_count; ++i) {
            CyGrammarRule* r = &grammar->rules[i];
            if (r->tokens) {
                free(r->tokens);
            }
        }
        free(grammar->rules);
    }
    grammar->rules      = NULL;
    grammar->rule_count = 0;
}

CyStatus cy_grammar_add_rule(CyGrammar* grammar,
                             const char* name,
                             CyGrammarRuleType type,
                             const char** tokens,
                             int token_count) {
    if (!grammar || !name || (!tokens && token_count > 0)) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }

    int new_count = grammar->rule_count + 1;
    CyGrammarRule* new_rules = (CyGrammarRule*)realloc(
        grammar->rules, sizeof(CyGrammarRule) * new_count);
    if (!new_rules) return CY_STATUS_ERROR_INTERNAL;

    grammar->rules = new_rules;

    CyGrammarRule* r = &grammar->rules[grammar->rule_count];
    r->name        = cy_grammar_make_string(name);
    r->type        = type;
    r->token_count = token_count;

    if (token_count > 0) {
        r->tokens = (CyString*)malloc(sizeof(CyString) * token_count);
        if (!r->tokens) return CY_STATUS_ERROR_INTERNAL;
        for (int i = 0; i < token_count; ++i) {
            r->tokens[i] = cy_grammar_make_string(tokens[i]);
        }
    } else {
        r->tokens = NULL;
    }

    grammar->rule_count = new_count;
    return CY_STATUS_OK;
}

CyStatus cy_grammar_apply(const CyGrammar* grammar,
                          const CyLexicon* lex,
                          const CySpeechMessage* input,
                          CySpeechMessage* out_msg) {
    if (!grammar || !lex || !input || !out_msg) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }

    /* Pattern-only stub:
       For now, just copy the input message to output.
       This still shows how a transformation API is wired.
    */

    out_msg->unit_count = input->unit_count;
    out_msg->units = (CySpeechUnit*)malloc(
        sizeof(CySpeechUnit) * out_msg->unit_count);
    if (!out_msg->units) return CY_STATUS_ERROR_INTERNAL;

    for (int i = 0; i < input->unit_count; ++i) {
        out_msg->units[i] = input->units[i];
    }

    (void)grammar;
    (void)lex;
    return CY_STATUS_OK;
}
