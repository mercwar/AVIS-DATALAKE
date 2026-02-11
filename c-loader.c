#include <wincrypt.h>
#pragma comment(lib, "crypt32.lib")

// Decodes a Base64 string from YAML into a binary file on disk
void Extract_Base64_Resource(const char* b64String, const char* outputPath) {
    DWORD binarySize = 0;
    
    // 1. Calculate required buffer size
    CryptStringToBinaryA(b64String, 0, CRYPT_STRING_BASE64, NULL, &binarySize, NULL, NULL);
    
    BYTE* buffer = (BYTE*)malloc(binarySize);
    
    // 2. Convert Base64 to Binary
    if (CryptStringToBinaryA(b64String, 0, CRYPT_STRING_BASE64, buffer, &binarySize, NULL, NULL)) {
        FILE* fp = fopen(outputPath, "wb");
        fwrite(buffer, 1, binarySize, fp);
        fclose(fp);
    }
    free(buffer);
}
