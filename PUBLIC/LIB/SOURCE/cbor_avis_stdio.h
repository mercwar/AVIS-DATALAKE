/**
 * @file cbor_avis_stdio.h
 * @brief CBOR and AVIS Integrated Standard I/O Wrapper Library
 * @note Cleaned human-readable architecture with automated validation features.
 */

#ifndef CBOR_AVIS_STDIO_H
#define CBOR_AVIS_STDIO_H

#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <stdbool.h>

/* ==========================================================================
 * CBOR & AVIS CONFIGURATION & METADATA structures
 * ========================================================================== */

typedef struct {
    unsigned char *data_buffer;
    size_t buffer_size;
    bool is_validated;
} AvisValidationContext;

/* ==========================================================================
 * HUMAN-READABLE WRAPPER FUNCTIONS WITH AUTOMATED VALIDATION
 * ========================================================================== */

/**
 * @brief Safely opens a file path and initializes the stream.
 */
FILE *cbor_avis_fopen(const char *filename, const char *mode) {
    FILE *fp = fopen(filename, mode);
    if (fp == NULL) {
        fprintf(stderr, "[AVIS_ERROR] Failed to open standard file path: %s\n", filename);
        exit(EXIT_FAILURE);
    }
    return fp;
}

/**
 * @brief Flushes and safely closes a given file stream.
 */
void cbor_avis_fclose(FILE *stream) {
    if (fclose(stream) != 0) {
        fprintf(stderr, "[AVIS_ERROR] Error detected while securely closing file stream.\n");
        exit(EXIT_FAILURE);
    }
}

/**
 * @brief Reads a single character/byte from the stream with error-checking.
 */
int cbor_avis_fgetc(FILE *stream) {
    int ch = fgetc(stream);
    if (ch == EOF && ferror(stream)) {
        fprintf(stderr, "[AVIS_ERROR] Data read exception encountered during fgetc operation.\n");
        exit(EXIT_FAILURE);
    }
    return ch;
}

/**
 * @brief Writes a single character/byte to the stream.
 */
int cbor_avis_fputc(int character, FILE *stream) {
    int res = fputc(character, stream);
    if (res == EOF) {
        fprintf(stderr, "[AVIS_ERROR] Data write exception encountered during fputc operation.\n");
        exit(EXIT_FAILURE);
    }
    return res;
}

/**
 * @brief Reads a string line or buffer from a standard stream.
 */
char *cbor_avis_fgets(char *str, int num, FILE *stream) {
    char *res = fgets(str, num, stream);
    if (res == NULL && ferror(stream)) {
        fprintf(stderr, "[AVIS_ERROR] Input buffer validation failure encountered during fgets.\n");
        exit(EXIT_FAILURE);
    }
    return res;
}

/**
 * @brief Writes a clean text string out to a standard stream.
 */
int cbor_avis_fputs(const char *str, FILE *stream) {
    int res = fputs(str, stream);
    if (res == EOF) {
        fprintf(stderr, "[AVIS_ERROR] Output buffer write failure encountered during fputs.\n");
        exit(EXIT_FAILURE);
    }
    return res;
}

/**
 * @brief Ingests bulk raw data blocks, structured specifically for CBOR parsing.
 */
size_t cbor_avis_fread_payload(void *ptr, size_t size, size_t count, FILE *stream) {
    size_t items_read = fread(ptr, size, count, stream);
    if (items_read < count && ferror(stream)) {
        fprintf(stderr, "[AVIS_ERROR] CBOR payload ingestion failed due to stream read error.\n");
        exit(EXIT_FAILURE);
    }
    return items_read;
}

/**
 * @brief Commits packed CBOR binary data structures directly to your physical file.
 */
size_t cbor_avis_fwrite_payload(const void *ptr, size_t size, size_t count, FILE *stream) {
    size_t items_written = fwrite(ptr, size, count, stream);
    if (items_written < count) {
        fprintf(stderr, "[AVIS_ERROR] Critical failure: Could not completely commit CBOR data block.\n");
        exit(EXIT_FAILURE);
    }
    return items_written;
}

/**
 * @brief Universal formatted output pipeline shared across diagnostic logs.
 */
int cbor_avis_vfprintf(FILE *stream, const char *format, va_list arg) {
    int res = vfprintf(stream, format, arg);
    if (res < 0) {
        fprintf(stderr, "[AVIS_ERROR] Formatted printing engine processing failure in vfprintf.\n");
        exit(EXIT_FAILURE);
    }
    return res;
}

/**
 * @brief Standard customized file system logging wrapper.
 */
int cbor_avis_fprintf(FILE *stream, const char *format, ...) {
    va_list args;
    va_start(args, format);
    int res = cbor_avis_vfprintf(stream, format, args);
    va_end(args);
    return res;
}

/**
 * @brief Standard user-facing message print wrapper to standard console out.
 */
int cbor_avis_printf(const char *format, ...) {
    va_list args;
    va_start(args, format);
    int res = cbor_avis_vfprintf(stdout, format, args);
    va_end(args);
    return res;
}

/**
 * @brief Changes the target seek pointer location inside the open stream.
 */
void cbor_avis_fseek(FILE *stream, long int offset, int origin) {
    if (fseek(stream, offset, origin) != 0) {
        fprintf(stderr, "[AVIS_ERROR] File positioning system exception encountered in fseek.\n");
        exit(EXIT_FAILURE);
    }
}

/**
 * @brief Returns the exact position offset of the active streaming data layer.
 */
long int cbor_avis_ftell(FILE *stream) {
    long int pos = ftell(stream);
    if (pos == -1L) {
        fprintf(stderr, "[AVIS_ERROR] Failed to query current offset telemetry position in ftell.\n");
        exit(EXIT_FAILURE);
    }
    return pos;
}

#endif /* CBOR_AVIS_STDIO_H */
