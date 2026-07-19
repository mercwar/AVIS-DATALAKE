/**
 * @file gdi_window.c
 * @brief Interactive Win32 Window Interface for Visualizing AVIS State Telemetry
 * @note Compiles under Windows linking windows_avis_gdi.h and cbor_avis_processing.h
 */

#include "windows_avis_gdi.h"
#include "cbor_avis_processing.h"

// Global packet simulation structure to act as our live data stream feed
AvisDataPacket g_telemetry_stream;

/**
 * @brief Window Procedure callback to handle OS messages and trigger repaints.
 */
LRESULT CALLBACK WindowProcessProcedure(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_PAINT: {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);

            // 1. Setup our screen canvas boundary rect
            RECT client_rect;
            GetClientRect(hwnd, &client_rect);

            // 2. Instantiate and select a sleek dark dashboard background brush
            HBRUSH bg_brush = win_avis_gdi_create_solid_brush(RGB(20, 24, 30));
            win_avis_gdi_fill_rect(hdc, &client_rect, bg_brush);

            // 3. Configure text layout properties
            SetTextColor(hdc, RGB(0, 255, 128)); // Bright console green
            SetBkMode(hdc, TRANSPARENT);

            // 4. Render the tracking matrix headers onto the grid coordinate space
            win_avis_gdi_text_out(hdc, 25, 25, "==================================================");
            win_avis_gdi_text_out(hdc, 25, 45, "   AVIS AUTOMATED REAL-TIME TELEMETRY MATRIX      ");
            win_avis_gdi_text_out(hdc, 25, 65, "==================================================");

            // 5. Render strings directly out of our global CBOR simulated telemetry structures
            char status_buffer[128];
            _snprintf(status_buffer, sizeof(status_buffer), "Target Node Identity: %s", "WIN_VISUAL_NODE_01");
            win_avis_gdi_text_out(hdc, 25, 105, status_buffer);

            unsigned int current_check = cbor_avis_calculate_checksum(g_telemetry_stream.payload, g_telemetry_stream.length);
            _snprintf(status_buffer, sizeof(status_buffer), "Calculated Stream Checksum: 0x%08X", current_check);
            win_avis_gdi_text_out(hdc, 25, 135, status_buffer);

            _snprintf(status_buffer, sizeof(status_buffer), "Buffer Ingestion Size: %lu Bytes Registered", (unsigned long)g_telemetry_stream.length);
            win_avis_gdi_text_out(hdc, 25, 165, status_buffer);

            // Draw operational safety status metric
            SetTextColor(hdc, RGB(0, 192, 255)); // Process Cyan
            win_avis_gdi_text_out(hdc, 25, 205, "AVIS PIPELINE STATUS: NOMINAL // LINK OPERATIONAL");

            // 6. Clean up graphics tracking resources safely
            win_avis_gdi_delete_object(bg_brush);
            EndPaint(hwnd, &ps);
            return 0;
        }
        case WM_DESTROY: {
            PostQuitMessage(0);
            return 0;
        }
        default:
            return DefWindowProc(hwnd, uMsg, wParam, lParam);
    }
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    (void)hPrevInstance; (void)lpCmdLine;

    // Initialize mock data payload inside the tracking structures
    memset(&g_telemetry_stream, 0, sizeof(AvisDataPacket));
    cbor_avis_pack_string(&g_telemetry_stream, "DISPLAY_INITIALIZED");
    cbor_avis_pack_int(&g_telemetry_stream, 100);

    const char *window_class_id = "AvisTelemetryMonitorClass";

    // Register our custom tracking Window architecture class layout
    WNDCLASSA window_class = {0};
    window_class.lpfnWndProc   = WindowProcessProcedure;
    window_class.hInstance     = hInstance;
    window_class.lpszClassName = window_class_id;
    window_class.hCursor       = LoadCursor(NULL, IDC_ARROW);

    if (!RegisterClassA(&window_class)) {
        fprintf(stderr, "[CRITICAL_ERROR] Core Win32 screen class initialization failed.\n");
        return EXIT_FAILURE;
    }

    // Instatiate the visual display container frame
    HWND hwnd = CreateWindowExA(
        0, window_class_id, "AVIS Real-time Telemetry Monitor",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE,
        CW_USEDEFAULT, CW_USEDEFAULT, 550, 320,
        NULL, NULL, hInstance, NULL
    );

    if (hwnd == NULL) {
        fprintf(stderr, "[CRITICAL_ERROR] Target display frame creation failed.\n");
        return EXIT_FAILURE;
    }

    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    // Standard application message polling loop dispatch engine
    MSG message;
    while (GetMessage(&message, NULL, 0, 0)) {
        TranslateMessage(&message);
        DispatchMessage(&message);
    }

    return (int)message.wParam;
}
