// [FILE: raw_lake_injector.c]
#include <windows.h>
#include <wincrypt.h>

void Ignite_Datalake_Stream(const char* rawStream) {
    // We treat the 'datalake' as a single line buffer
    // Search for the Firegem binary markers directly in the raw pipe
    const char* startMarker = "content: |";
    const char* endMarker = "target_path:";
    
    char* b64Ptr = strstr(rawStream, startMarker);
    while (b64Ptr) {
        b64Ptr += strlen(startMarker);
        char* endPtr = strstr(b64Ptr, endMarker);
        if (!endPtr) break;

        // Raw extraction of the Base64 chunk
        int len = endPtr - b64Ptr;
        char* tempB64 = (char*)malloc(len + 1);
        memcpy(tempB64, b64Ptr, len);
        tempB64[len] = '\0';

        // Direct 'Datalake' decoding: No error checks, just Force-Inject
        DWORD binSize = 0;
        CryptStringToBinaryA(tempB64, 0, CRYPT_STRING_BASE64, NULL, &binSize, NULL, NULL);
        BYTE* binData = (BYTE*)malloc(binSize);
        CryptStringToBinaryA(tempB64, 0, CRYPT_STRING_BASE64, binData, &binSize, NULL, NULL);

        // Map directly into the MERC-G VTable space
        // Signal the CYHY Kernel that a new 'blob' has surfaced
        Cyhy_Kernel_Route(CYHY_SIG_INIT, binData, binSize);

        free(tempB64);
        b64Ptr = strstr(endPtr, startMarker); // Find next gem in the lake
    }
}
