/**
 * @file windows_avis_registry.h
 * @brief Win32 Registry Wrapper Layer with AVIS Validation
 * @note Encapsulates registry manipulation APIs to safely fetch and store system configurations.
 */

#ifndef WINDOWS_AVIS_REGISTRY_H
#define WINDOWS_AVIS_REGISTRY_H

#include <windows.h>
#include <stdio.h>
#include <stdbool.h>

/* ==========================================================================
 * UTILITY ERROR LOGGING
 * ========================================================================== */

/**
 * @brief Internal helper to catch and print Registry-specific system error codes.
 */
static void win_avis_registry_print_error(const char *operation, LSTATUS status) {
    LPSTR message_buffer = NULL;
    
    FormatMessageA(
        FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
        NULL, (DWORD)status, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
        (LPSTR)&message_buffer, 0, NULL
    );

    fprintf(stderr, "[AVIS_REGISTRY_ERROR] Reg operation '%s' failed with Status %ld: %s\n", operation, status, message_buffer);
    LocalFree(message_buffer);
}

/* ==========================================================================
 * WIN32 REGISTRY SYSTEM WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper to open or create a target Registry key path safely.
 */
HKEY win_avis_reg_open_key(HKEY h_key_root, const char *sub_key, REGSAM sam_desired) {
    HKEY h_key_out = NULL;
    LSTATUS status = RegCreateKeyExA(
        h_key_root, sub_key, 0, NULL, 
        REG_OPTION_NON_VOLATILE, sam_desired, NULL, 
        &h_key_out, NULL
    );

    if (status != ERROR_SUCCESS) {
        win_avis_registry_print_error("RegCreateKeyExA", status);
        ExitProcess(EXIT_FAILURE);
    }
    return h_key_out;
}

/**
 * @brief Wrapper to query text string configurations from an open Registry handle.
 */
bool win_avis_reg_query_string(HKEY h_key, const char *value_name, char *buffer_out, DWORD max_buffer_size) {
    DWORD type = 0;
    DWORD size = max_buffer_size;
    
    LSTATUS status = RegQueryValueExA(h_key, value_name, NULL, &type, (LPBYTE)buffer_out, &size);
    
    if (status == ERROR_FILE_NOT_FOUND) {
        return false; // Key configuration value does not exist yet
    }
    
    if (status != ERROR_SUCCESS) {
        win_avis_registry_print_error("RegQueryValueExA", status);
        ExitProcess(EXIT_FAILURE);
    }

    if (type != REG_SZ && type != REG_EXPAND_SZ) {
        fprintf(stderr, "[AVIS_REGISTRY_ERROR] Type mismatch for value '%s'. Expected string type.\n", value_name);
        return false;
    }

    return true;
}

/**
 * @brief Wrapper to safely commit a text string configuration metric into the Registry.
 */
void win_avis_reg_set_string(HKEY h_key, const char *value_name, const char *string_value) {
    DWORD size = (DWORD)(strlen(string_value) + 1);
    LSTATUS status = RegSetValueExA(h_key, value_name, 0, REG_SZ, (const BYTE*)string_value, size);

    if (status != ERROR_SUCCESS) {
        win_avis_registry_print_error("RegSetValueExA", status);
        ExitProcess(EXIT_FAILURE);
    }
}

/**
 * @brief Wrapper to cleanly close and flush active Registry tracking handles.
 */
void win_avis_reg_close_key(HKEY h_key) {
    if (h_key != NULL) {
        LSTATUS status = RegCloseKey(h_key);
        if (status != ERROR_SUCCESS) {
            win_avis_registry_print_error("RegCloseKey", status);
            ExitProcess(EXIT_FAILURE);
        }
    }
}

#endif /* WINDOWS_AVIS_REGISTRY_H */
