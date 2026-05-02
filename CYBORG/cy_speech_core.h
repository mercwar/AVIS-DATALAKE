/*
    cy_speech_core.h

    PURPOSE:
        Core interfaces for a synthetic "cyborg language" layer.
        This header defines the high-level speech unit model,
        message model, and core APIs the robot uses to generate
        and interpret cyborg-style utterances for users.

        Designed for learning: rich in typedefs, structs, enums,
        and function prototypes.
*/

#ifndef CY_SPEECH_CORE_H
#define CY_SPEECH_CORE_H

#ifdef __cplusplus
extern "C" {
#endif

typedef enum CyBool {
    CY_FALSE = 0,
    CY_TRUE  = 1
} CyBool;

typedef enum CyStatus {
    CY_STATUS_OK = 0,
    CY_STATUS_ERROR_INVALID_ARGUMENT,
    CY_STATUS_ERROR_IO,
    CY_STATUS_ERROR_PARSE,
    CY_STATUS_ERROR_INTERNAL
} CyStatus;

typedef enum CySpeechTone {
    CY_TONE_NEUTRAL = 0,
    CY_TONE_TECHNICAL,
    CY_TONE_WARM,
    CY_TONE_ALERT,
    CY_TONE_SYSTEM
} CySpeechTone;

typedef enum CySpeechChannel {
    CY_CHANNEL_TEXT = 0,
    CY_CHANNEL_CONSOLE,
    CY_CHANNEL_LOG,
    CY_CHANNEL_DEBUG
} CySpeechChannel;

typedef struct CyString {
    const char* data;
    int         length;
} CyString;

typedef struct CyBuffer {
    char* data;
    int   length;
    int   capacity;
} CyBuffer;

typedef struct CySpeechUnit {
    CyString       token;
    CySpeechTone   tone;
    CySpeechChannel channel;
    int            weight;
} CySpeechUnit;

typedef struct CySpeechMessage {
    CySpeechUnit* units;
    int           unit_count;
} CySpeechMessage;

/*
    cy_speech_init

    PURPOSE:
        Initialize any global state required by the cyborg speech
        system. In a learning context, this shows how init APIs
        are typically shaped.
*/
CyStatus cy_speech_init(void);

/*
    cy_speech_shutdown

    PURPOSE:
        Release any global state associated with the speech system.
*/
void cy_speech_shutdown(void);

/*
    cy_speech_make_unit

    PURPOSE:
        Construct a single speech unit from a raw token and tone.
*/
CySpeechUnit cy_speech_make_unit(const char* token,
                                 CySpeechTone tone,
                                 CySpeechChannel channel,
                                 int weight);

/*
    cy_speech_message_from_text

    PURPOSE:
        Convert a plain text string into a cyborg-style message
        by tokenizing and assigning tones.
*/
CyStatus cy_speech_message_from_text(const char* text,
                                     CySpeechTone tone,
                                     CySpeechChannel channel,
                                     CySpeechMessage* out_msg);

/*
    cy_speech_message_to_text

    PURPOSE:
        Render a cyborg-style message back into plain text.
*/
CyStatus cy_speech_message_to_text(const CySpeechMessage* msg,
                                   CyBuffer* out_text);

/*
    cy_speech_message_free

    PURPOSE:
        Release memory associated with a CySpeechMessage.
*/
void cy_speech_message_free(CySpeechMessage* msg);

#ifdef __cplusplus
}
#endif

#endif /* CY_SPEECH_CORE_H */
