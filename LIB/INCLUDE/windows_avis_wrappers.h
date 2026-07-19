/**
 * @file windows_avis_wrappers.h
 * @brief Win32 API Standard Wrapper Layer with AVIS Validation
 * @note Encapsulates core windows.h functions to handle handles, memory, and threads safely.
 */

#ifndef WINDOWS_AVIS_WRAPPERS_H
#define WINDOWS_AVIS_WRAPPERS_H

#include <windows.h>
#include <stdio.h>
#include <stdbool.h>

/* ==========================================================================
 * UTILITY ERROR LOGGING
 * ========================================================================== */

/**
 * @brief Internal helper to extract and display the exact Win32 system error code.
 */
static void windows_avis_print_last_error(const char *function_name) {
    DWORD error_id = GetLastError();
    LPSTR message_buffer = NULL;
    
    FormatMessageA(
        FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
        NULL, error_id, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
        (LPSTR)&message_buffer, 0, NULL
    );

    fprintf(stderr, "[AVIS_WIN32_ERROR] %s failed with Code %lu: %s\n", function_name, error_id, message_buffer);
    LocalFree(message_buffer);
}

/* ==========================================================================
 * WIN32 FILE SYSTEM WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper for CreateFileA to open or create files safely.
 */
HANDLE win_avis_create_file(const char *filename, DWORD access, DWORD share_mode, DWORD disposition) {
    HANDLE h_file = CreateFileA(filename, access, share_mode, NULL, disposition, FILE_ATTRIBUTE_NORMAL, NULL);
    if (h_file == INVALID_HANDLE_VALUE) {
        windows_avis_print_last_error("CreateFileA");
        ExitProcess(EXIT_FAILURE);
    }
    return h_file;
}

/**
 * @brief Wrapper for ReadFile to handle binary streaming blocks safely.
 */
BOOL win_avis_read_file(HANDLE h_file, LPVOID buffer, DWORD bytes_to_read, LPDWORD bytes_read) {
    BOOL result = ReadFile(h_file, buffer, bytes_to_read, bytes_read, NULL);
    if (!result) {
        windows_avis_print_last_error("ReadFile");
        ExitProcess(EXIT_FAILURE);
    }
    return result;
}

/**
 * @brief Wrapper for WriteFile to guarantee block persistence to disk.
 */
BOOL win_avis_write_file(HANDLE h_file, LPCVOID buffer, DWORD bytes_to_write, LPDWORD bytes_written) {
    BOOL result = WriteFile(h_file, buffer, bytes_to_write, bytes_written, NULL);
    if (!result) {
        windows_avis_print_last_error("WriteFile");
        ExitProcess(EXIT_FAILURE);
    }
    return result;
}

/**
 * @brief Wrapper for CloseHandle to clean up system resource tracking.
 */
void win_avis_close_handle(HANDLE object) {
    if (object != NULL && object != INVALID_HANDLE_VALUE) {
        if (!CloseHandle(object)) {
            windows_avis_print_last_error("CloseHandle");
            ExitProcess(EXIT_FAILURE);
        }
    }
}

/* ==========================================================================
 * WIN32 VIRTUAL MEMORY MANAGEMENT WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper for VirtualAlloc to commit isolated pages in memory.
 */
LPVOID win_avis_virtual_alloc(SIZE_T size, DWORD allocation_type, DWORD protect) {
    LPVOID address = VirtualAlloc(NULL, size, allocation_type, protect);
    if (address == NULL) {
        windows_avis_print_last_error("VirtualAlloc");
        ExitProcess(EXIT_FAILURE);
    }
    return address;
}

/**
 * @brief Wrapper for VirtualFree to cleanly decommit system RAM blocks.
 */
BOOL win_avis_virtual_free(LPVOID address, SIZE_T size, DWORD free_type) {
    BOOL result = VirtualFree(address, size, free_type);
    if (!result) {
        windows_avis_print_last_error("VirtualFree");
        ExitProcess(EXIT_FAILURE);
    }
    return result;
}

/* ==========================================================================
 * WIN32 MULTI-THREADING WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper for CreateThread to deploy worker tasks asynchronously.
 */
HANDLE win_avis_create_thread(LPTHREAD_START_ROUTINE start_address, LPVOID parameter, LPDWORD thread_id) {
    HANDLE h_thread = CreateThread(NULL, 0, start_address, parameter, 0, thread_id);
    if (h_thread == NULL) {
        windows_avis_print_last_error("CreateThread");
        ExitProcess(EXIT_FAILURE);
    }
    return h_thread;
}

/**
 * @brief Wrapper for WaitForSingleObject to cleanly synchronize running execution blocks.
 */
DWORD win_avis_wait_for_single_object(HANDLE handle, DWORD milliseconds) {
    DWORD result = WaitForSingleObject(handle, milliseconds);
    if (result == WAIT_FAILED) {
        windows_avis_print_last_error("WaitForSingleObject");
        ExitProcess(EXIT_FAILURE);
    }
    return result;
}

#endif /* WINDOWS_AVIS_WRAPPERS_H */
