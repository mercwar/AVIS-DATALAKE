/**
 * @file gdi_audio_main.c
 * @brief Integrated Visual GDI and Multimedia Audio Telemetry Dashboard
 * @note Links windows_avis_gdi.h, windows_avis_audio.h, and windows_avis_wrappers.h
 */

#include "windows_avis_gdi.h"
#include "windows_avis_audio.h"
#include "windows_avis_wrappers.h"
#include "cbor_avis_processing.h"

// Global program states and active system metrics data packet
AvisDataPacket g_visual_telemetry;
HWAVEOUT       g_audio_device = NULL;
bool           g_simulate_fault = false;

typedef struct {
    double pitch_frequency;
    int    length_ms;
} AudioAlertSignal;

/**
 * @brief Thread routine to process sound playback asynchronously without lagging the window frame.
 */
DWORD WINAPI AudioPlaybackWorkerThread(LPVOID lpParam) {
    AudioAlertSignal *signal = (AudioAlertSignal*)lpParam;
    if (signal != NULL && g_audio_device != NULL) {
        win_avis_audio_play_tone(g_audio_device, signal->pitch_frequency, signal->length_ms);
        free(signal);
    }
    return 0;
}

/**
 * @brief Instantiates a non-blocking background sound alert dispatch thread.
 */
void DispatchAsyncSystemSound(double freq, int duration) {
    AudioAlertSignal *signal = (AudioAlertSignal*)malloc(sizeof(AudioAlertSignal));
    if (signal != NULL) {
        signal->pitch_frequency = freq;
        signal->length_ms = duration;
        DWORD thread_id;
        // Deploy worker task asynchronously using Win32 API layer wrappers
        HANDLE h_thread = win_avis_create_thread(AudioPlaybackWorkerThread, signal, &thread_id);
        win_avis_close_handle(h_thread);
    }
}

/**
 * @brief Main window callback processing UI updates, canvas repaints, and keyboard intercepts.
 */
LRESULT CALLBACK DashboardWindowCallback(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_KEYDOWN: {
            if (wParam == VK_SPACE) {
                // Trigger nominal step telemetry packaging sequence 
                g_simulate_fault = false;
                cbor_avis_pack_int(&g_visual_telemetry, rand() % 100);
                
                // Play rising success pulse frequency tone in background thread
                DispatchAsyncSystemSound(880.0, 150); 
                InvalidateRect(hwnd, NULL, TRUE); // Re-paint window viewport frame
            }
            else if (wParam == VK_ESCAPE) {
                // Inject fault profile simulation parameters
                g_simulate_fault = true;
                g_visual_telemetry.integrity_checksum = 0xDEADBEEF; // Force fault verification
                
                // Play falling alarm warning frequency sequence
                DispatchAsyncSystemSound(440.0, 300);
                InvalidateRect(hwnd, NULL, TRUE);
            }
            return 0;
        }
        case WM_PAINT: {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);
            RECT bounds;
            GetClientRect(hwnd, &bounds);

            // Select background colors based on operational sanity metrics states
            COLORREF bg_color = g_simulate_fault ? RGB(70, 15, 20) : RGB(15, 20, 26);
            HBRUSH h_brush = win_avis_gdi_create_solid_brush(bg_color);
            win_avis_gdi_fill_rect(hdc, &bounds, h_brush);

            SetBkMode(hdc, TRANSPARENT);

            if (g_simulate_fault) {
                SetTextColor(hdc, RGB(255, 60, 60)); // Critical Alert Warning Red
                win_avis_gdi_text_out(hdc, 30, 40,  "[!] AVIS PIPELINE COMPROMISED - CHECKSUM MISMATCH [!]");
                win_avis_gdi_text_out(hdc, 30, 80,  "Status Level: SYSTEM_FAULT_ALERT");
                win_avis_gdi_text_out(hdc, 30, 120, "Press [SPACE] to clear exceptions state logs.");
            } else {
                SetTextColor(hdc, RGB(0, 255, 140)); // Matrix Terminal Green
                win_avis_gdi_text_out(hdc, 30, 40,  "AVIS AV/MULTIPROCESSING GRAPHICS & MULTIMEDIA SYSTEM");
                win_avis_gdi_text_out(hdc, 30, 80,  "Pipeline Context: RUNNING // Telemetry Feed Synchronized");
                
                char output_str;
                unsigned int check = cbor_avis_calculate_checksum(g_visual_telemetry.payload, g_visual_telemetry.length);
                _snprintf(output_str, sizeof(output_str), "Active Tracking Context Checksum: 0x%08X", check);
                win_avis_gdi_text_out(hdc, 30, 120, output_str);

                SetTextColor(hdc, RGB(200, 200, 200));
                win_avis_gdi_text_out(hdc, 30, 180, "Controls: [SPACE] Step Telemetry & Sound // [ESC] Trigger Alert Fault");
            }

            win_avis_gdi_delete_object(h_brush);
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

int WINAPI WinMain(HINSTANCE hInst, HINSTANCE hPrev, LPSTR lpCmd, int nShow) {
    (void)hPrev; (void)lpCmd;

    // 1. Fire up hardware audio device channel paths
    g_audio_device = win_avis_audio_open_device();

    // Initialize foundational packed state tracking context values
    memset(&g_visual_telemetry, 0, sizeof(AvisDataPacket));
    cbor_avis_pack_string(&g_visual_telemetry, "AV_SYS_INIT");

    const char *class_id = "AvisAVDashboardClass";
    WNDCLASSA wnd_class = {0};
    wnd_class.lpfnWndProc   = DashboardWindowCallback;
    wnd_class.hInstance     = hInst;
    wnd_class.lpszClassName = class_id;
    wnd_class.hCursor       = LoadCursor(NULL, IDC_ARROW);

    if (!RegisterClassA(&wnd_class)) return EXIT_FAILURE;

    HWND hwnd = CreateWindowExA(
        0, class_id, "AVIS Audio-Visual Telemetry Console",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE,
        CW_USEDEFAULT, CW_USEDEFAULT, 620, 280,
        NULL, NULL, hInst, NULL
    );

    if (hwnd == NULL) return EXIT_FAILURE;

    // Emit confirmation initialization pitch beep alert
    DispatchAsyncSystemSound(600.0, 100);

    ShowWindow(hwnd, nShow);
    UpdateWindow(hwnd);

    // Standard engine window frame event poll cycle dispatcher
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // 2. Clear out driver registrations cleanly prior to exit
    win_avis_audio_close_device(g_audio_device);
    return (int)msg.wParam;
}
