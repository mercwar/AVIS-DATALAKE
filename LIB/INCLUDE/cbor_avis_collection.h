/**
 * @file cbor_avis_collection.h
 * @brief Map and List Object Management Container Intermediary
 * @note Abstracts structural lists to quickly filter out components within iterating streams.
 */

#ifndef CBOR_AVIS_COLLECTION_H
#define CBOR_AVIS_COLLECTION_H

#include "cbor_avis_iterator.h"
#include "cbor_avis_match.h"

#define MAX_COLLECTION_ELEMENTS 64

typedef struct {
    char key_identifiers[MAX_COLLECTION_ELEMENTS][32];
    size_t total_stored_items;
} AvisKeyValueMap;

/**
 * @brief Scans an active linear buffer sequence to dynamically parse out explicitly known object markers.
 */
void avis_collection_build_index(const AvisDataPacket *packet, AvisKeyValueMap *map_out) {
    if (packet == NULL || map_out == NULL) return;
    
    map_out->total_stored_items = 0;
    
    AvisObjectIterator iterator;
    avis_iterator_init(&iterator, packet->payload, packet->length);
    
    unsigned char element_type = 0;
    unsigned char element_base_val = 0;
    size_t element_stride = 0;

    // Linearly parse the packed array to populate index matrices safely
    while (avis_iterator_has_next(&iterator) && map_out->total_stored_items < MAX_COLLECTION_ELEMENTS) {
        size_t current_offset = iterator.cursor;
        
        if (avis_iterator_next_element(&iterator, &element_type, &element_base_val, &element_stride)) {
            if (element_type == CBOR_TYPE_TEXT_STR) {
                // Safely extract string label using existing boundary utilities
                char extracted_label[32];
                size_t temp_offset = current_offset;
                
                if (avis_cbor_extract_string(packet, &temp_offset, extracted_label, sizeof(extracted_label))) {
                    // Save reference context metadata
                    strncpy(map_out->key_identifiers[map_out->total_stored_items], extracted_label, 31);
                    map_out->key_identifiers[map_out->total_stored_items][31] = '\0';
                    map_out->total_stored_items++;
                }
            }
        }
    }
}

/**
 * @brief Iterates cleanly through an indexed matrix to confirm if a specific token or key is registered.
 */
bool avis_collection_contains_key(const AvisKeyValueMap *map, const char *search_key, bool use_wildcard) {
    if (map == NULL || search_key == NULL) return false;
    
    for (size_t i = 0; i < map->total_stored_items; i++) {
        if (use_wildcard) {
            if (avis_match_wildcard(map->key_identifiers[i], search_key)) {
                return true;
            }
        } else {
            if (avis_match_literal(map->key_identifiers[i], search_key)) {
                return true;
            }
        }
    }
    return false;
}

#endif /* CBOR_AVIS_COLLECTION_H */
