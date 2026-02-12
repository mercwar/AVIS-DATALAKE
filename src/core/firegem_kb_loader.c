/* AVIS_IO:FVS_MKDIR_P      - Auto-create directories */
/* AVIS_IO:FVS_CLONE_BGIN   - Preparation for V3 migration */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

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

void create_dirs(const char *path) {
    char tmp[512];
    char *p = NULL;
    snprintf(tmp, sizeof(tmp), "%s", path);
    for (p = tmp + 1; *p; p++) {
        if (*p == '/') {
            *p = 0;
            mkdir(tmp, S_IRWXU);
            *p = '/';
        }
    }
}

int main(int argc, char** argv) {
    if (argc < 3) return 1;
    create_dirs(argv[2]);
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
    free(encoded); fclose(in); fclose(out);
    printf("[FVS_IO] Materialized Sector: %s\n", argv[2]);
    return 0;
}
