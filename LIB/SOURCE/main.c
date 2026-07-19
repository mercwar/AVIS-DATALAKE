/**
 * @file main.c
 * @brief Execution Layer for CBOR Serialization and AVIS Verification Pipeline
 * @note Compiles cleanly alongside cbor_avis_stdio.h and cbor_avis_processing.h
 */

#include "cbor_avis_processing.h"

int main(void) {
    const char *storage_file = "datalake_payload.bin";
    
    // Initialize our transmission structures
    AvisDataPacket outbound_packet;
    memset(&outbound_packet, 0, sizeof(AvisDataPacket));
    
    AvisDataPacket inbound_packet;
    memset(&inbound_packet, 0, sizeof(AvisDataPacket));

    cbor_avis_printf("==================================================\n");
    cbor_avis_printf("STAGE 1: INITIALIZING DATA OUTBOUND PACKING\n");
    cbor_avis_printf("==================================================\n");

    // Pack structured application data using CBOR layout format
    cbor_avis_pack_string(&outbound_packet, "MERCWAR_NODE_01");
    cbor_avis_pack_int(&outbound_packet, 42);
    cbor_avis_pack_string(&outbound_packet, "STATUS_NOMINAL");

    cbor_avis_printf("[SYSTEM_INFO] Payload generated size: %lu bytes.\n", (unsigned long)outbound_packet.length);

    // Commit payload to file using underlying safe file wrappers
    cbor_avis_save_packet(storage_file, &outbound_packet);

    cbor_avis_printf("\n==================================================\n");
    cbor_avis_printf("STAGE 2: RETRIEVING AND VALIDATING FILE MATRIX\n");
    cbor_avis_printf("==================================================\n");

    // Ingest data and perform AVIS validation verification check
    bool is_valid = cbor_avis_load_and_verify_packet(storage_file, &inbound_packet);

    if (is_valid) {
        cbor_avis_printf("[SYSTEM_SUCCESS] Pipeline operational. Data secure.\n");
    } else {
        cbor_avis_printf("[CRITICAL_ALERT] Pipeline compromised. Verification rejected.\n");
        return EXIT_FAILURE;
    }

    cbor_avis_printf("==================================================\n");
    return EXIT_SUCCESS;
}
