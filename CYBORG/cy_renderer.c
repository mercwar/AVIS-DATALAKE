/*
    cy_renderer.c

    PURPOSE:
        Implementation of cyborg message rendering.
*/

#include "cy_renderer.h"

#include <stdlib.h>
#include <string.h>

CyStatus cy_render_message(const CySpeechMessage* msg,
                           CyRenderStyle style,
                           CyBuffer* out_text) {
    if (!msg || !out_text) {
        return CY_STATUS_ERROR_INVALID_ARGUMENT;
    }

    /* For learning: we reuse cy_speech_message_to_text-like logic,
       but add simple style markers. */

    int extra = 0;
    if (style == CY_RENDER_CYBORG_TAGGED) {
        extra = 4 * msg->unit_count; /* rough overhead for tags */
    }

    int base_len = 0;
    for (int i = 0; i < msg->unit_count; ++i) {
        base_len += msg->units[i].token.length;
        if (i + 1 < msg->unit_count) base_len++;
    }

    int total_len = base_len + extra;
    char* buf = (char*)malloc((size_t)total_len + 1);
    if (!buf) return CY_STATUS_ERROR_INTERNAL;

    int pos = 0;
    for (int i = 0; i < msg->unit_count; ++i) {
        const CySpeechUnit* u = &msg->units[i];

        if (style == CY_RENDER_CYBORG_TAGGED) {
            buf[pos++] = '[';
            buf[pos++] = 'C';
            buf[pos++] = ']';
        }

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
