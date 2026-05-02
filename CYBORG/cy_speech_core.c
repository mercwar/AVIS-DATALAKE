/*
    cy_speech_core.c

    PURPOSE:
        Implementation of the core cyborg speech interfaces.
        This file is pattern-rich and safe to read as text.
*/

#include "cy_speech_core.h"

#include <stdlib.h>
#include <string.h>

CyStatus cy_speech_init(void) {
    /* Stub: no global state yet. */
    return CY_STATUS_OK;
}

void cy_speech_shutdown(void) {
    /* Stub: nothing to release yet. */
}

static CyString cy_make_string(const char* s) {
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

CySpeechUnit cy_speech_make_unit(const char* token,
                                 CySpeechTone tone,
                                 CySpeechChannel channel,
                                 int weight) {
    CySpeechUnit u;
    u.token   = cy_make_string(token);
    u.tone    = tone;
    u.channel = channel;
    u.weight  = weight;
    return u;
}

CyStatus cy_speech_message_from_text(const char* text,
                                     CySpeechTone tone,
                                     CySpeechChannel channel,
                                     CySpeechMessage* out_msg) {
    if (!text || !out_msg) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }

    /* Simple whitespace tokenizer for learning purposes. */
    int len = (int)strlen(text);
    int count = 0;
    for (int i = 0; i < len; ++i) {
        if (text[i] == ' ') count++;
    }
    count++; /* number of tokens */

    CySpeechUnit* units = (CySpeechUnit*)malloc(sizeof(CySpeechUnit) * count);
    if (!units) return CY_STATUS_ERROR_INTERNAL;

    int start = 0;
    int idx   = 0;
    for (int i = 0; i <= len; ++i) {
        if (text[i] == ' ' || text[i] == '\0') {
            int token_len = i - start;
            char* token = (char*)malloc((size_t)token_len + 1);
            if (!token) {
                free(units);
                return CY_STATUS_ERROR_INTERNAL;
            }
            memcpy(token, text + start, (size_t)token_len);
            token[token_len] = '\0';

            units[idx] = cy_speech_make_unit(token, tone, channel, 1);
            idx++;
            start = i + 1;
        }
    }

    out_msg->units      = units;
    out_msg->unit_count = count;
    return CY_STATUS_OK;
}

CyStatus cy_speech_message_to_text(const CySpeechMessage* msg,
                                   CyBuffer* out_text) {
    if (!msg || !out_text) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }

    int total_len = 0;
    for (int i = 0; i < msg->unit_count; ++i) {
        total_len += msg->units[i].token.length;
        if (i + 1 < msg->unit_count) total_len++; /* space */
    }

    char* buf = (char*)malloc((size_t)total_len + 1);
    if (!buf) return CY_STATUS_ERROR_INTERNAL;

    int pos = 0;
    for (int i = 0; i < msg->unit_count; ++i) {
        const CySpeechUnit* u = &msg->units[i];
        if (u->token.data && u->token.length > 0) {
            memcpy(buf + pos, u->token.data, (size_t)u->token.length);
            pos += u->token.length;
        }
        if (i + 1 < msg->unit_count) {
            buf[pos++] = ' ';
        }
    }
    buf[pos] = '\0';

    out_text->data     = buf;
    out_text->length   = pos;
    out_text->capacity = pos + 1;
    return CY_STATUS_OK;
}

void cy_speech_message_free(CySpeechMessage* msg) {
    if (!msg) return;
    if (msg->units) {
        for (int i = 0; i < msg->unit_count; ++i) {
            /* tokens were allocated as char* in message_from_text */
            if (msg->units[i].token.data) {
                free((void*)msg->units[i].token.data);
            }
        }
        free(msg->units);
    }
    msg->units      = NULL;
    msg->unit_count = 0;
}
