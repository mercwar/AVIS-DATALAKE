/*
    cy_session.c

    PURPOSE:
        Implementation of the cyborg language session model.
*/

#include "cy_session.h"

#include <string.h>

CyStatus cy_session_init(CySession* session) {
    if (!session) return CY_STATUS_ERROR_INVALID_ARGUMENT;

    CyStatus st;

    st = cy_lexicon_init(&session->lexicon);
    if (st != CY_STATUS_OK) return st;

    st = cy_grammar_init(&session->grammar);
    if (st != CY_STATUS_OK) return st;

    st = cy_speech_init();
    if (st != CY_STATUS_OK) return st;

    /* Example lexicon entries for learning. */
    cy_lexicon_add(&session->lexicon, "HELLO", "GREET", CY_LEX_ENTRY_WORD, 10);
    cy_lexicon_add(&session->lexicon, "USER",  "ENTITY", CY_LEX_ENTRY_WORD, 5);

    session->initialized = CY_TRUE;
    return CY_STATUS_OK;
}

void cy_session_shutdown(CySession* session) {
    if (!session) return;
    cy_lexicon_free(&session->lexicon);
    cy_grammar_free(&session->grammar);
    cy_speech_shutdown();
    session->initialized = CY_FALSE;
}

CyStatus cy_session_process_input(CySession* session,
                                  const char* user_text,
                                  CyBuffer* out_response) {
    if (!session || !user_text || !out_response) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }
    if (!session->initialized) {
        return CY_STATUS_ERROR_INTERNAL;
    }

    CySpeechMessage input_msg;
    CySpeechMessage transformed_msg;
    CyStatus st;

    st = cy_speech_message_from_text(user_text,
                                     CY_TONE_TECHNICAL,
                                     CY_CHANNEL_TEXT,
                                     &input_msg);
    if (st != CY_STATUS_OK) return st;

    st = cy_grammar_apply(&session->grammar,
                          &session->lexicon,
                          &input_msg,
                          &transformed_msg);
    if (st != CY_STATUS_OK) {
        cy_speech_message_free(&input_msg);
        return st;
    }

    st = cy_render_message(&transformed_msg,
                           CY_RENDER_CYBORG_TAGGED,
                           out_response);

    cy_speech_message_free(&input_msg);
    cy_speech_message_free(&transformed_msg);

    return st;
}
