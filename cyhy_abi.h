/*******************************************************************************
 * [CYHY_RUNTIME_ABI_v2.1]
 *******************************************************************************/

// Standard Event IDs
#define CYHY_SIG_INIT     0x001  // System initialization
#define CYHY_SIG_RENDER   0x002  // Request PictureBox Render
#define CYHY_SIG_CAPTURE  0x003  // CapturePreview finished
#define CYHY_SIG_ERROR    0x999  // Fatal Exception

// The ABI Function Signature
typedef HRESULT (__stdcall *CYHY_DISPATCH)(
    int SignalID,       // Event type
    void* DataBuffer,   // Pointer to data (JSON/XML/Raw)
    long DataSize,      // Size of data
    void* Originator    // Pointer to the calling lane (MERC_G ID)
);

// Exported Kernel Function
__declspec(dllexport) HRESULT __stdcall Cyhy_Kernel_Route(int SigID, void* Buffer, long Size);
