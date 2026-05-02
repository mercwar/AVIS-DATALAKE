/*
    cy_renderer.h

    PURPOSE:
        Rendering layer for cyborg language output.
*/

#ifndef CY_RENDERER_H
#define CY_RENDERER_H

#include "cy_speech_core.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum CyRenderStyle {
    CY_RENDER_PLAIN = 0,
    CY_RENDER_CYBORG_TAGGED,
    CY_RENDER_MINIMAL
} CyRenderStyle;

CyStatus cy_render_message(const CySpeechMessage* msg,
                           CyRenderStyle style,
                           CyBuffer* out_text);

#ifdef __cplusplus
}
#endif

#endif /* CY_RENDERER_H */
