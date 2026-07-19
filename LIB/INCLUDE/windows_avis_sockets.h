/**
 * @file windows_avis_sockets.h
 * @brief Win32 Network Socket Wrapper Layer with AVIS Validation
 * @note Encapsulates winsock2.h functionality to create server/client pipelines safely.
 */

#ifndef WINDOWS_AVIS_SOCKETS_H
#define WINDOWS_AVIS_SOCKETS_H

#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif

#include <windows.h>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Link the Windows Socket library explicitly if compiling with MSVC
#pragma comment(lib, "Ws2_32.lib")

/* ==========================================================================
 * UTILITY NETWORK ERROR LOGGING
 * ========================================================================== */

/**
 * @brief Internal helper to capture and display Winsock-specific error states.
 */
static void winsock_avis_print_last_error(const char *operation_name) {
    int error_code = WSAGetLastError();
    fprintf(stderr, "[AVIS_SOCKET_ERROR] Network operation '%s' failed with WSACode: %d\n", operation_name, error_code);
}

/* ==========================================================================
 * WINSOCK SUBSYSTEM & SOCKET MANAGEMENT WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper to initialize the underlying Windows Sockets DLL (WSAStartup).
 */
void win_avis_sockets_startup(void) {
    WSADATA wsa_data;
    int result = WSAStartup(MAKEWORD(2, 2), &wsa_data);
    if (result != 0) {
        fprintf(stderr, "[AVIS_SOCKET_ERROR] WSAStartup failed. System initialization error: %d\n", result);
        exit(EXIT_FAILURE);
    }
}

/**
 * @brief Wrapper to safely clean up and release Winsock subsystem allocations (WSACleanup).
 */
void win_avis_sockets_cleanup(void) {
    if (WSACleanup() == SOCKET_ERROR) {
        winsock_avis_print_last_error("WSACleanup");
    }
}

/**
 * @brief Wrapper to instantiate a standard TCP streaming network socket descriptor.
 */
SOCKET win_avis_socket_create(int af, int type, int protocol) {
    SOCKET sock = socket(af, type, protocol);
    if (sock == INVALID_SOCKET) {
        winsock_avis_print_last_error("socket");
        win_avis_sockets_cleanup();
        exit(EXIT_FAILURE);
    }
    return sock;
}

/**
 * @brief Wrapper to bind a listening socket endpoint to a specific local port and IP address.
 */
void win_avis_socket_bind(SOCKET sock, const struct sockaddr *name, int namelen) {
    int result = bind(sock, name, namelen);
    if (result == SOCKET_ERROR) {
        winsock_avis_print_last_error("bind");
        closesocket(sock);
        win_avis_sockets_cleanup();
        exit(EXIT_FAILURE);
    }
}

/**
 * @brief Wrapper to transition an active socket into an asynchronous inbound connection listener.
 */
void win_avis_socket_listen(SOCKET sock, int backlog) {
    int result = listen(sock, backlog);
    if (result == SOCKET_ERROR) {
        winsock_avis_print_last_error("listen");
        closesocket(sock);
        win_avis_sockets_cleanup();
        exit(EXIT_FAILURE);
    }
}

/**
 * @brief Wrapper to accept a pending remote connection handshake from the incoming queue.
 */
SOCKET win_avis_socket_accept(SOCKET sock, struct sockaddr *addr, int *addrlen) {
    SOCKET client_sock = accept(sock, addr, addrlen);
    if (client_sock == INVALID_SOCKET) {
        winsock_avis_print_last_error("accept");
        closesocket(sock);
        win_avis_sockets_cleanup();
        exit(EXIT_FAILURE);
    }
    return client_sock;
}

/**
 * @brief Wrapper to establish an active outbound socket link to a remote listener node.
 */
void win_avis_socket_connect(SOCKET sock, const struct sockaddr *name, int namelen) {
    int result = connect(sock, name, namelen);
    if (result == SOCKET_ERROR) {
        winsock_avis_print_last_error("connect");
        closesocket(sock);
        win_avis_sockets_cleanup();
        exit(EXIT_FAILURE);
    }
}

/* ==========================================================================
 * DATA TRANSMISSION & STREAM STREAMING WRAPPERS
 * ========================================================================== */

/**
 * @brief High-reliability wrapper to ensure a full block memory payload is dispatched over the wire.
 */
int win_avis_socket_send_all(SOCKET sock, const char *buffer, int length) {
    int total_sent = 0;
    int bytes_left = length;
    int n = 0;

    while (total_sent < length) {
        n = send(sock, buffer + total_sent, bytes_left, 0);
        if (n == SOCKET_ERROR) {
            winsock_avis_print_last_error("send");
            closesocket(sock);
            return SOCKET_ERROR;
        }
        total_sent += n;
        bytes_left -= n;
    }
    return total_sent;
}

/**
 * @brief High-reliability wrapper to force blocks of data to accumulate completely before pipeline processing.
 */
int win_avis_socket_recv_all(SOCKET sock, char *buffer, int length) {
    int total_received = 0;
    int bytes_left = length;
    int n = 0;

    while (total_received < length) {
        n = recv(sock, buffer + total_received, bytes_left, 0);
        if (n == SOCKET_ERROR) {
            winsock_avis_print_last_error("recv");
            closesocket(sock);
            return SOCKET_ERROR;
        }
        if (n == 0) {
            // Peer closed the network link prematurely
            break; 
        }
        total_received += n;
        bytes_left -= n;
    }
    return total_received;
}

/**
 * @brief Wrapper to cleanly shut down socket pipelines and reclaim resources.
 */
void win_avis_socket_close(SOCKET sock) {
    if (sock != INVALID_SOCKET) {
        // Shutdown transmission directions to flush buffers cleanly
        shutdown(sock, SD_BOTH); 
        if (closesocket(sock) == SOCKET_ERROR) {
            winsock_avis_print_last_error("closesocket");
        }
    }
}

#endif /* WINDOWS_AVIS_SOCKETS_H */
