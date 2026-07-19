/**
 * @file cbor_avis_processing.h
 * @brief High-level CBOR Serialization and AVIS Verification Engine
 * @note Relies entirely on the underlying cbor_avis_stdio.h file wrapper primitives.
 */

#ifndef CBOR_AVIS_PROCESSING_H
#define CBOR_AVIS_PROCESSING_H

#include "cbor_avis_stdio.h"
#include <string.h>

/* ==========================================================================
 * DATA STRUCTURES
 * ========================================================================== */

#define MAX_PAYLOAD_SIZE 4096

typedef enum {
    CBOR_TYPE_INT      = 0x00,
    CBOR_TYPE_TEXT_STR = 0x60,
    CBOR_TYPE_BYTE_STR = 0x40
} CborMajorType;

typedef struct {
    unsigned char payload[MAX_PAYLOAD_SIZE];
    size_t length;
    unsigned int integrity_checksum;
} AvisDataPacket;

/* ==========================================================================
 * HIGH-LEVEL UTILITY AND CBOR SERIALIZATION WRAPPERS
 * ========================================================================== */

/**
 * @brief Computes a basic AVIS checksum to verify packet data integrity.
 */
unsigned int cbor_avis_calculate_checksum(const unsigned char *data, size_t length) {
    unsigned int checksum = 0;
    for (size_t i = 0; i < length; i++) {
        checksum += data[i];
    }
    return checksum;
}

/**
 * @brief Packs a text string into a standard CBOR format string structure.
 */
void cbor_avis_pack_string(AvisDataPacket *packet, const char *text) {
    size_t str_len = strlen(text);
    if (packet->length + str_len + 1 > MAX_PAYLOAD_SIZE) {
        cbor_avis_printf("[AVIS_PROCESSING_ERROR] Maximum packet size exceeded during string packing.\n");
        exit(EXIT_FAILURE);
    }

    // CBOR Major type 3 (text string). For simplicity, we prepend the length byte
    packet->payload[packet->length++] = (unsigned char)(CBOR_TYPE_TEXT_STR | (str_len & 0x1F));
    memcpy(&(packet->payload[packet->length]), text, str_len);
    packet->length += str_len;
}

/**
 * @brief Packs an integer into a standard CBOR integer format structure.
 */
void cbor_avis_pack_int(AvisDataPacket *packet, int value) {
    if (packet->length + 1 > MAX_PAYLOAD_SIZE) {
        cbor_avis_printf("[AVIS_PROCESSING_ERROR] Maximum packet size exceeded during int packing.\n");
        exit(EXIT_FAILURE);
    }
    
    // CBOR Major type 0 (unsigned integer) / basic simple int parsing
    packet->payload[packet->length++] = (unsigned char)(CBOR_TYPE_INT | (value & 0x1F));
}

/* ==========================================================================
 * DISK STREAM OPERATIONS USING PREVIOUS WRAPPERS
 * ========================================================================== */

/**
 * @brief Dispatches a fully prepared AVIS data packet straight to disk storage.
 * @note Leverages cbor_avis_fopen, cbor_avis_fwrite_payload, and cbor_avis_fclose.
 */
void cbor_avis_save_packet(const char *filepath, AvisDataPacket *packet) {
    // Generate AVIS verification metric prior to saving
    packet->integrity_checksum = cbor_avis_calculate_checksum(packet->payload, packet->length);

    FILE *stream = cbor_avis_fopen(filepath, "wb");

    // Write the raw packet headers and payload contents safely
    cbor_avis_fwrite_payload(packet, sizeof(AvisDataPacket), 1, stream);
    
    cbor_avis_fclose(stream);
    cbor_avis_printf("[AVIS_INFO] Successfully synchronized verified CBOR payload packet to path: %s\n", filepath);
}

/**
 * @brief Loads a saved data packet and subjects it to strict AVIS validation.
 * @note Leverages cbor_avis_fopen, cbor_avis_fread_payload, and cbor_avis_fclose.
 */
bool cbor_avis_load_and_verify_packet(const char *filepath, AvisDataPacket *packet_out) {
    FILE *stream = cbor_avis_fopen(filepath, "rb");

    // Pull down the entire block structured telemetry chunk
    cbor_avis_fread_payload(packet_out, sizeof(AvisDataPacket), 1, stream);
    cbor_avis_fclose(stream);

    // Compute expected properties to fulfill AVIS strict compliance assertions
    unsigned int computed_check = cbor_avis_calculate_checksum(packet_out->payload, packet_out->length);
    
    if (computed_check != packet_out->integrity_checksum) {
        cbor_avis_printf("[AVIS_VERIFICATION_FAILED] Data corruption caught! Checksum mismatch on file: %s\n", filepath);
        return false;
    }

    cbor_avis_printf("[AVIS_VERIFICATION_SUCCESS] Packet loaded from %s passed compliance testing.\n", filepath);
    return true;
}

#endif /* CBOR_AVIS_PROCESSING_H */
