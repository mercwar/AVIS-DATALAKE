/**
 * @file cbor_avis_strings.h
 * @brief Human-readable String Conversion and Diagnostics Layer
 * @note Provides boundaries-checked safe utilities to convert and display text matrices.
 */

#ifndef CBOR_AVIS_STRINGS_H
#define CBOR_AVIS_STRINGS_H

#include "cbor_avis_processing.h"
#include <ctype.h>

/* ==========================================================================
 * STRING ENCODING & DIAGNOSTIC CONVERSION FUNCTIONS
 * ========================================================================== */

/**
 * @brief Safely copies a raw string with strict bounds constraints.
 */
void avis_string_safe_copy(char *dest, const char *src, size_t dest_max_size) {
    if (dest == NULL || src == NULL || dest_max_size == 0) {
        return;
    }
    size_t i = 0;
    for (i = 0; i < dest_max_size - 1 && src[i] != '\0'; i++) {
        dest[i] = src[i];
    }
    dest[i] = '\0';
}

/**
 * @brief Converts an entire text string to uppercase format.
 */
void avis_string_to_uppercase(char *str) {
    if (str == NULL) return;
    while (*str) {
        *str = (char)toupper((unsigned char)*str);
        str++;
    }
}

/**
 * @brief Converts a binary buffer array into a readable Hexadecimal text string.
 */
void avis_bytes_to_hex_string(const unsigned char *bytes, size_t length, char *hex_out, size_t hex_max_len) {
    if (bytes == NULL || hex_out == NULL || hex_max_len < (length * 2 + 1)) {
        return;
    }
    
    const char hex_digits[] = "0123456789ABCDEF";
    size_t out_idx = 0;

    for (size_t i = 0; i < length; i++) {
        hex_out[out_idx++] = hex_digits[(bytes[i] >> 4) & 0x0F];
        hex_out[out_idx++] = hex_digits[bytes[i] & 0x0F];
    }
    hex_out[out_idx] = '\0';
}

/**
 * @brief Extracts a standard C text string from a packed CBOR data stream packet.
 */
bool avis_cbor_extract_string(const AvisDataPacket *packet, size_t *offset, char *str_out, size_t max_out_len) {
    if (packet == NULL || offset == NULL || str_out == NULL || *offset >= packet->length) {
        return false;
    }

    unsigned char header = packet->payload[*offset];
    
    // Check if the major type corresponds to a CBOR Text String (Major Type 3 = 0x60)
    if ((header & 0xE0) != CBOR_TYPE_TEXT_STR) {
        return false; 
    }

    // Extract length directly out of the minor argument field
    size_t str_len = header & 0x1F;
    (*offset)++; // Step over the header byte

    if (*offset + str_len > packet->length || str_len >= max_out_len) {
        return false; // Out of bounds safety trigger
    }

    // Move content into output array
    memcpy(str_out, &(packet->payload[*offset]), str_len);
    str_out[str_len] = '\0';
    
    *offset += str_len; // Advance the pointer index past the string data
    return true;
}

#endif /* CBOR_AVIS_STRINGS_H */
