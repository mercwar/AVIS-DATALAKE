/**
 * @file cbor_avis_iterator.h
 * @brief High-Safety Sequential Iterator Engine for Packed Arrays and Objects
 * @note Implements bounds-guaranteed linear cursor movement across structured data payloads.
 */

#ifndef CBOR_AVIS_ITERATOR_H
#define CBOR_AVIS_ITERATOR_H

#include "cbor_avis_processing.h"

typedef struct {
    const unsigned char *buffer;
    size_t total_length;
    size_t cursor;
    size_t current_item_index;
} AvisObjectIterator;

/**
 * @brief Initializes an entry cursor wrapper onto a target data payload array.
 */
void avis_iterator_init(AvisObjectIterator *iterator, const unsigned char *payload_buffer, size_t payload_len) {
    if (iterator == NULL || payload_buffer == NULL) return;
    iterator->buffer = payload_buffer;
    iterator->total_length = payload_len;
    iterator->cursor = 0;
    iterator->current_item_index = 0;
}

/**
 * @brief Validates if the tracker cursor contains remaining unparsed elements.
 */
bool avis_iterator_has_next(const AvisObjectIterator *iterator) {
    if (iterator == NULL) return false;
    return (iterator->cursor < iterator->total_length);
}

/**
 * @brief Inspects and advances the cursor to extract the next sequential structural payload element.
 */
bool avis_iterator_next_element(AvisObjectIterator *iterator, unsigned char *type_out, unsigned char *value_out, size_t *element_size_out) {
    if (iterator == NULL || !avis_iterator_has_next(iterator)) {
        return false;
    }

    // Step 1: Decode element layout structure securely
    unsigned char structural_header = iterator->buffer[iterator->cursor];
    *type_out = (structural_header & 0xE0); // Extract CBOR major data type identifier
    
    size_t inner_length = (structural_header & 0x1F);
    size_t total_element_stride = 1; // Start counting from header baseline byte

    if (*type_out == CBOR_TYPE_TEXT_STR || *type_out == CBOR_TYPE_BYTE_STR) {
        total_element_stride += inner_length;
        if (iterator->cursor + total_element_stride > iterator->total_length) {
            cbor_avis_printf("[AVIS_ITERATOR_ERROR] Structural pointer breach: Corrupted length tag.\n");
            return false;
        }
        *value_out = iterator->buffer[iterator->cursor + 1]; // First actual content byte address
    } else {
        *value_out = (unsigned char)inner_length; // Direct value assignment for simple integers
    }

    *element_size_out = total_element_stride;
    iterator->cursor += total_element_stride;
    iterator->current_item_index++;
    return true;
}

/**
 * @brief Resets an active tracking context block pointer position back to baseline zero status.
 */
void avis_iterator_reset(AvisObjectIterator *iterator) {
    if (iterator != NULL) {
        iterator->cursor = 0;
        iterator->current_item_index = 0;
    }
}

#endif /* CBOR_AVIS_ITERATOR_H */
