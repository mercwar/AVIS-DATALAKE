/**
 * @file network_server.c
 * @brief Win32 Network Server Deployment for CBOR Payload System Architecture
 * @note Compiles on Windows systems linking windows_avis_sockets.h and cbor_avis_processing.h
 */

#include "windows_avis_sockets.h"
#include "cbor_avis_processing.h"

#define LISTEN_PORT 8080

int main(void) {
    // 1. Initialize the Windows Socket subsystem
    win_avis_sockets_startup();
    printf("[SERVER] Winsock subsystem initialized successfully.\n");

    // 2. Create the primary listening socket
    SOCKET server_socket = win_avis_socket_create(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    
    // Configure server local endpoint properties (IPv4, Port 8080, Accept any IP)
    struct sockaddr_in server_addr;
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(LISTEN_PORT);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    // 3. Bind socket to endpoint and begin listening for connections
    win_avis_socket_bind(server_socket, (struct sockaddr*)&server_addr, sizeof(server_addr));
    win_avis_socket_listen(server_socket, SOMAXCONN);
    
    printf("[SERVER] Listener established on port %d. Waiting for node connection...\n\n", LISTEN_PORT);
    printf("==================================================\n");
    printf("SERVER PIpELINE: AWAITING INBOUND TRANSACTION\n");
    printf("==================================================\n");

    // 4. Accept the incoming client handshakes
    struct sockaddr_in client_addr;
    int client_addr_len = sizeof(client_addr);
    SOCKET client_socket = win_avis_socket_accept(server_socket, (struct sockaddr*)&client_addr, &client_addr_len);
    
    char client_ip[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &client_addr.sin_addr, client_ip, INET_ADDRSTRLEN);
    printf("[SERVER] Secure connection handshake established with remote node: %s\n", client_ip);

    // 5. Ingest streaming network byte array directly into an AVIS Data Packet structure
    AvisDataPacket received_packet;
    memset(&received_packet, 0, sizeof(AvisDataPacket));

    int bytes_received = win_avis_socket_recv_all(
        client_socket, 
        (char*)&received_packet, 
        sizeof(AvisDataPacket)
    );

    if (bytes_received == SOCKET_ERROR || bytes_received < (int)sizeof(AvisDataPacket)) {
        fprintf(stderr, "[SERVER_ERROR] Ingress stream cut short or disconnected prematurely.\n");
        win_avis_socket_close(client_socket);
        win_avis_socket_close(server_socket);
        win_avis_sockets_cleanup();
        return EXIT_FAILURE;
    }

    printf("[SERVER] Received block payload transmission: %d bytes over the wire.\n", bytes_received);

    // 6. Execute AVIS validation verification check on the received network buffer
    unsigned int computed_check = cbor_avis_calculate_checksum(received_packet.payload, received_packet.length);
    
    printf("\n==================================================\n");
    printf("SERVER PIPELINE: METRIC COMPLIANCE INSPECTION\n");
    printf("==================================================\n");

    if (computed_check == received_packet.integrity_checksum) {
        printf("[SERVER_AVIS_SUCCESS] Packet integrity verification passed.\n");
        printf("[SERVER_INFO] Remote Node Identity Tag: %u bytes of valid packed CBOR data.\n", (unsigned int)received_packet.length);
    } else {
        fprintf(stderr, "[SERVER_AVIS_FAILED] Network packet corrupted! Checksum mismatch detected.\n");
    }

    // 7. Clean up connection pipelines and release handles
    win_avis_socket_close(client_socket);
    win_avis_socket_close(server_socket);
    win_avis_sockets_cleanup();

    printf("==================================================\n");
    printf("[SERVER] Pipeline execution concluded successfully.\n");
    return EXIT_SUCCESS;
}
