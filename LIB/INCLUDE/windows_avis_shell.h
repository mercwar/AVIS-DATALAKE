/**
 * @file windows_avis_shell.h
 * @brief Win32 Shell API Wrapper Layer with AVIS Validation
 * @note Encapsulates shell execution engines to spawn pipeline subprocesses cleanly.
 */

#ifndef WINDOWS_AVIS_SHELL_H
#define WINDOWS_AVIS_SHELL_H

#include <windows.h>
#include <shellapi.h>
#include <shlobj.h>
#include <stdio.h>
#include <stdbool.h>

// Link the Windows Shell library explicitly if compiling with MSVC
#pragma comment(lib, "Shell32.lib")

/* ==========================================================================
 * WIN32 SHELL EXECUTION WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper around ShellExecuteA to launch background system nodes or applications safely.
 */
HINSTANCE win_avis_shell_execute(const char *operation, const char *file, const char *parameters, const char *directory, int show_cmd) {
    INT_PTR result = (INT_PTR)ShellExecuteA(
        NULL,        // No parent window handle
        operation,   // e.g., "open", "edit"
        file,        // Executable path or target resource
        parameters,  // Command-line argument block
        directory,   // Working directory path
        show_cmd     // Visibility state flag (e.g., SW_SHOWMINIMIZED)
    );

    // ShellExecute returns a value greater than 32 if it succeeds
    if (result <= 32) {
        fprintf(stderr, "[AVIS_SHELL_ERROR] ShellExecuteA failed to spawn resource '%s' with error status code: %ld\n", file, (long)result);
        ExitProcess(EXIT_FAILURE);
    }
    return (HINSTANCE)result;
}

/**
 * @brief Wrapper to extract standard Windows known directory paths (e.g., AppData, Documents).
 */
void win_avis_shell_get_known_folder(int csidl, char *path_out, DWORD max_len) {
    // Verify system path mapping compatibility
    HRESULT hr = SHGetFolderPathA(NULL, csidl, NULL, SHGFP_TYPE_CURRENT, path_out);
    if (FAILED(hr)) {
        fprintf(stderr, "[AVIS_SHELL_ERROR] Failed to query local system folder location. HRESULT: 0x%08X\n", (unsigned int)hr);
        ExitProcess(EXIT_FAILURE);
    }
}

#endif /* WINDOWS_AVIS_SHELL_H */
