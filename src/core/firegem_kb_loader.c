// AVIS_IO:FVS_READ_KB      - Read Base64 KB from kb_packets/*.kb
// AVIS_IO:FVS_DECODE_B64   - Decode Base64 into raw source bytes
// AVIS_IO:FVS_WRITE_SRC    - Write decoded source to dl/runtime/*.c
// AVIS_IO:FVS_BOOT_CHAIN   - This loader participates in KB->System->Next-KB chain

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char b64chars[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

void decode_b64(const char* input, FILE* out) {
    int counts = 0, buffer = 0;
    for (int i = 0; input[i] != '\0'; i++) {
        const char* p = strchr(b64chars, input[i]);
        if (!p) continue;
        buffer = (buffer << 6) | (int)(p - b64chars);
        counts++;
        if (counts == 4) {
            fputc((buffer >> 16) & 0xFF, out);
            fputc((buffer >> 8) & 0xFF, out);
            fputc(buffer & 0xFF, out);
            counts = 0; buffer = 0;
        }
    }
}

int main(int argc, char** argv) {
    if (argc < 3) return 1;
    FILE *in = fopen(argv[1], "r");
    FILE *out = fopen(argv[2], "wb");
    if (!in || !out) return 1;

    fseek(in, 0, SEEK_END);
    long fsize = ftell(in);
    fseek(in, 0, SEEK_SET);
    char *encoded = malloc(fsize + 1);
    fread(encoded, 1, fsize, in);
    encoded[fsize] = '\0';

    decode_b64(encoded, out);
    
    free(encoded);
    fclose(in); fclose(out);
    printf("[FVS] Decoded %s to %s\n", argv[1], argv[2]);
    return 0;
}
