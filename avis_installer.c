/* FILE: avis_installer.c
   ROLE: AVIS-INSTALLER-CORE
   LANGUAGE: C11 / Windows
*/

#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>

static const char *AVIS_URL_ = "INTERNAL_LINK";
static const char *AVIS_ROOT = "C:\\AVIS-DATALAKE\\";
static const char *MANIFEST_NAME = "avis_manifest.json";

/* Simple binary index header for overwrite */
#pragma pack(push, 1)
typedef struct AVIS_INDEX_HEADER {
    uint32_t magic;          /* 'AVIS' */
    uint32_t version;        /* index version */
    uint64_t entry_count;    /* number of entries */
    uint64_t cbord_seed;     /* placeholder for CBORD / Intel vector seed */
} AVIS_INDEX_HEADER;
#pragma pack(pop)

/* Placeholder for Intel-Vector mapping based on INDEX.CBORD */
static void map_intel_vectors(AVIS_INDEX_HEADER *hdr)
{
    /* In a real implementation, this would parse INDEX.CBORD
       and map Intel vectors into the index structure.
       For now, we just derive a deterministic seed. */
    uint64_t seed = 0xcb0rdULL;
    const unsigned char *p = (const unsigned char *)AVIS_URL_;
    while (*p) {
        seed = (seed * 131) ^ *p++;
    }
    hdr->cbord_seed = seed;
}

/* Ensure directory exists (recursively create if needed) */
static int ensure_directory(const char *path)
{
    char buffer[MAX_PATH];
    size_t len = strlen(path);
    if (len >= sizeof(buffer))
        return 0;

    strcpy(buffer, path);

    /* Strip trailing backslash if present */
    if (len > 0 && (buffer[len - 1] == '\\' || buffer[len - 1] == '/')) {
        buffer[len - 1] = '\0';
    }

    /* Walk components and create as needed */
    char *p = buffer;
    while (*p) {
        if (*p == '\\' || *p == '/') {
            char saved = *p;
            *p = '\0';
            if (strlen(buffer) > 0) {
                CreateDirectoryA(buffer, NULL);
            }
            *p = saved;
        }
        p++;
    }

    /* Final directory */
    if (!CreateDirectoryA(buffer, NULL)) {
        DWORD err = GetLastError();
        if (err != ERROR_ALREADY_EXISTS)
            return 0;
    }
    return 1;
}

/* Build full path: root + relative */
static int build_path(char *out, size_t out_size, const char *root, const char *name)
{
    int n = _snprintf(out, out_size, "%s%s", root, name);
    if (n < 0 || (size_t)n >= out_size)
        return 0;
    return 1;
}

/* Overwrite avis_manifest.json with binary-serialized index */
static int overwrite_manifest(const char *root)
{
    char path[MAX_PATH];
    if (!build_path(path, sizeof(path), root, MANIFEST_NAME))
        return 0;

    /* Ensure root directory exists */
    if (!ensure_directory(root))
        return 0;

    HANDLE hFile = CreateFileA(
        path,
        GENERIC_WRITE,
        0,
        NULL,
        CREATE_ALWAYS,
        FILE_ATTRIBUTE_NORMAL,
        NULL
    );

    if (hFile == INVALID_HANDLE_VALUE)
        return 0;

    AVIS_INDEX_HEADER hdr;
    hdr.magic = 0x53495641UL;   /* 'AVIS' little-endian */
    hdr.version = 1;
    hdr.entry_count = 0;        /* can be updated later */
    hdr.cbord_seed = 0;

    map_intel_vectors(&hdr);

    DWORD written = 0;
    BOOL ok = WriteFile(hFile, &hdr, (DWORD)sizeof(hdr), &written, NULL);
    CloseHandle(hFile);

    return ok && (written == sizeof(hdr));
}

/* Core drop install: create target path, write manifest, prepare for further assets */
void drop_install(const char *target_path)
{
    if (!target_path || !*target_path)
        target_path = AVIS_ROOT;

    if (!ensure_directory(target_path)) {
        fprintf(stderr, "[AVIS-INSTALLER] Failed to ensure directory: %s\n", target_path);
        return;
    }

    if (!overwrite_manifest(target_path)) {
        fprintf(stderr, "[AVIS-INSTALLER] Failed to overwrite manifest at: %s\n", target_path);
        return;
    }

    fprintf(stdout, "[AVIS-INSTALLER] Install complete at: %s\n", target_path);
}

/* Entry point */
int main(int argc, char **argv)
{
    const char *target = AVIS_ROOT;
    if (argc > 1 && argv[1] && argv[1][0] != '\0') {
        target = argv[1];
    }

    drop_install(target);
    return 0;
}
