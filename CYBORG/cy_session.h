/*
    cy_session.h

    PURPOSE:
        Session model for interactions between the assistant and
        users using the cyborg language layer.
*/

#ifndef CY_SESSION_H
#define CY_SESSION_H

#include "cy_speech_core.h"
#include "cy_lexicon.h"
#include "cy_grammar.h"
#include "cy_renderer.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct CySession {
    CyLexicon lexicon;
    CyGrammar grammar;
    CyBool    initialized;
} CySession;

CyStatus cy_session_init(CySession* session);

void     cy_session_shutdown(CySession* session);

CyStatus cy_session_process_input(CySession* session,
                                  const char* user_text,
                                  CyBuffer* out_response);

#ifdef __cplusplus
}
#endif

#endif /* CY_SESSION_H */
