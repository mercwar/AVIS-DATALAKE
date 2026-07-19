/**
 * @file windows_avis_gdi.h
 * @brief Win32 GDI Graphical Wrapper Layer with AVIS Validation
 * @note Encapsulates GDI painting resources to render diagnostics onto user interface elements.
 */

#ifndef WINDOWS_AVIS_GDI_H
#define WINDOWS_AVIS_GDI_H

#include <windows.h>
#include <stdio.h>
#include <stdbool.h>

/* ==========================================================================
 * WIN32 GDI GRAPHICAL WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper to safely acquire a Device Context (DC) handle for a targeted Window layout.
 */
HDC win_avis_gdi_get_dc(HWND h_wnd) {
    HDC h_dc = GetDC(h_wnd);
    if (h_dc == NULL) {
        fprintf(stderr, "[AVIS_GDI_ERROR] Failed to acquire device context handle for targeted window.\n");
        ExitProcess(EXIT_FAILURE);
    }
    return h_dc;
}

/**
 * @brief Wrapper to securely create a solid canvas paint brush (CreateSolidBrush).
 */
HBRUSH win_avis_gdi_create_solid_brush(COLORREF color) {
    HBRUSH h_brush = CreateSolidBrush(color);
    if (h_brush == NULL) {
        fprintf(stderr, "[AVIS_GDI_ERROR] Failed to initialize solid pixel matrix brush resource.\n");
        ExitProcess(EXIT_FAILURE);
    }
    return h_brush;
}

/**
 * @brief Wrapper to assign a drawing resource object into the active Device Context pipeline.
 */
HGDIOBJ win_avis_gdi_select_object(HDC h_dc, HGDIOBJ h_obj) {
    HGDIOBJ h_old_obj = SelectObject(h_dc, h_obj);
    if (h_old_obj == NULL || h_old_obj == HGDI_ERROR) {
        fprintf(stderr, "[AVIS_GDI_ERROR] Device context binding transaction rejected on object selection.\n");
        ExitProcess(EXIT_FAILURE);
    }
    return h_old_obj;
}

/**
 * @brief Wrapper to fill a canvas boundary box cleanly using a selected brush layout.
 */
void win_avis_gdi_fill_rect(HDC h_dc, const RECT *lprc, HBRUSH h_br) {
    if (FillRect(h_dc, lprc, h_br) == 0) {
        fprintf(stderr, "[AVIS_GDI_ERROR] Failed to fill region coordinate geometry canvas box.\n");
        ExitProcess(EXIT_FAILURE);
    }
}

/**
 * @brief Wrapper to paint diagnostic text string arrays onto coordinate grid maps.
 */
void win_avis_gdi_text_out(HDC h_dc, int x, int y, const char *text) {
    int str_len = (int)strlen(text);
    if (!TextOutA(h_dc, x, y, text, str_len)) {
        fprintf(stderr, "[AVIS_GDI_ERROR] Text glyph rendering failure at coordinate points: (%d, %d).\n", x, y);
        ExitProcess(EXIT_FAILURE);
    }
}

/**
 * @brief Wrapper to cleanly release an allocated Window Device Context tracker block.
 */
void win_avis_gdi_release_dc(HWND h_wnd, HDC h_dc) {
    if (h_dc != NULL) {
        if (ReleaseDC(h_wnd, h_dc) != 1) {
            fprintf(stderr, "[AVIS_GDI_ERROR] Failed to release device context tracking handle lock.\n");
            ExitProcess(EXIT_FAILURE);
        }
    }
}

/**
 * @brief Wrapper to completely destroy allocated GDI brushes or pens to prevent memory leaks.
 */
void win_avis_gdi_delete_object(HGDIOBJ h_obj) {
    if (h_obj != NULL) {
        if (!DeleteObject(h_obj)) {
            fprintf(stderr, "[AVIS_GDI_ERROR] Failed to destroy graphics subsystem drawing asset.\n");
            ExitProcess(EXIT_FAILURE);
        }
    }
}

#endif /* WINDOWS_AVIS_GDI_H */
