/**
 * @file win_main.c
 * @brief Win32 Execution Layer for CBOR Payload System Architecture
 * @note Compiles on Windows systems linking windows_avis_wrappers.h and cbor_avis_processing.h
 */

#include "windows_avis_wrappers.h"
#include "cbor_avis_processing.h"

// Worker thread routine to simulate parallel background validation processing
DWORD WINAPI BackgroundValidationWorker(LPVOID lpParam) {
    AvisDataPacket *packet = (AvisDataPacket*)lpParam;
    
    // Perform background validation scan using processing layer utility
    unsigned int check = cbor_avis_calculate_checksum(packet->payload, packet->length);
    
    if (check == packet->integrity_checksum) {
        printf("[WIN_AVIS_THREAD] Background safety scan passed. Packet structurally sound.\n");
    } else {
        fprintf(stderr, "[WIN_AVIS_THREAD] Warning: Background checksum validation mismatch!\n");
    }
    return 0;
}

int main(void) {
    const char *win_target_file = "win_datalake.bin";
    DWORD bytes_processed = 0;

    printf("==================================================\n");
    printf("WIN32 PIpELINE: STARTING OUTBOUND TRANSACTION\n");
    printf("==================================================\n");

    // Allocate structured memory buffers using virtual page allocations
    AvisDataPacket *outbound = (AvisDataPacket*)win_avis_virtual_alloc(
        sizeof(AvisDataPacket), 
        MEM_COMMIT | MEM_RESERVE, 
        PAGE_READWRITE
    );
    
    AvisDataPacket *inbound = (AvisDataPacket*)win_avis_virtual_alloc(
        sizeof(AvisDataPacket), 
        MEM_COMMIT | MEM_RESERVE, 
        PAGE_READWRITE
    );

    // Build the packed binary contents into the virtual buffer space
    cbor_avis_pack_string(outbound, "WIN32_NATIVE_NODE");
    cbor_avis_pack_int(outbound, 2026); // Sync current epoch tracking marker
    cbor_avis_pack_string(outbound, "SECURE_ENV");
    outbound->integrity_checksum = cbor_avis_calculate_checksum(outbound->payload, outbound->length);

    // Initialize target file handle using safe Win32 API wrappers
    HANDLE h_file_write = win_avis_create_file(
        win_target_file, 
        GENERIC_WRITE, 
        0, 
        CREATE_ALWAYS
    );

    // Commit payload contents directly into the local storage layer
    win_avis_write_file(h_file_write, outbound, sizeof(AvisDataPacket), &bytes_processed);
    win_avis_close_handle(h_file_write);
    printf("[WIN_AVIS_INFO] Successfully committed %lu bytes via native kernel IO.\n", bytes_processed);

    printf("\n==================================================\n");
    printf("WIN32 PIPELINE: ASYNCHRONOUS INBOUND INGESTION\n");
    printf("==================================================\n");

    // Reopen and retrieve telemetry via file mapping wrappers
    HANDLE h_file_read = win_avis_create_file(
        win_target_file, 
        GENERIC_READ, 
        FILE_SHARE_READ, 
        OPEN_EXISTING
    );

    win_avis_read_file(h_file_read, inbound, sizeof(AvisDataPacket), &bytes_processed);
    win_avis_close_handle(h_file_read);

    // Deploy an asynchronous thread worker to handle AVIS check in background
    DWORD thread_id;
    HANDLE h_worker = win_avis_create_thread(BackgroundValidationWorker, inbound, &thread_id);

    // Wait cleanly for background thread to conclude validation
    win_avis_wait_for_single_object(h_worker, INFINITE);
    win_avis_close_handle(h_worker);

    // Free the virtual page memory maps cleanly
    win_avis_virtual_free(outbound, 0, MEM_RELEASE);
    win_avis_virtual_free(inbound, 0, MEM_RELEASE);

    printf("==================================================\n");
    printf("[WIN_AVIS_SUCCESS] Win32 transaction sequence completed.\n");
    return EXIT_SUCCESS;
}
