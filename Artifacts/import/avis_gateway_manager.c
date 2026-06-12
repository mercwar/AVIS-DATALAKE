#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_VAL_LEN 512
#define MAX_LINE_LEN 1024

// AVIS: struct_declaration | name="AvisArtifact" | type="core_registry"
typedef struct {
    char repo_root[MAX_VAL_LEN];
    char repo_name[MAX_VAL_LEN];
    char io_link[MAX_VAL_LEN];
} AvisArtifact;

// Helper to cleanly extract text found inside quotes
void extract_quoted_value(const char *line, const char *key, char *dest) {
    char *key_pos = strstr(line, key);
    if (key_pos) {
        char *start_quote = strchr(key_pos, '"');
        if (start_quote) {
            char *end_quote = strchr(start_quote + 1, '"');
            if (end_quote) {
                size_t len = end_quote - (start_quote + 1);
                if (len >= MAX_VAL_LEN) len = MAX_VAL_LEN - 1;
                strncpy(dest, start_quote + 1, len);
                dest[len] = '\0';
            }
        }
    }
}

// AVIS: function_export | target="gateway.avis" | mode="serialization"
void avis_export_artifacts(const char *filename, AvisArtifact *list, int count) {
    FILE *f = fopen(filename, "w");
    if (!f) {
        printf("[!] Export Failure: Unable to write to %s\n", filename);
        return;
    }

    fprintf(f, "begin.avis.gateway\n");
    for (int i = 0; i < count; i++) {
        fprintf(f, "    repo.root.\"%s\"\n", list[i].repo_root);
        fprintf(f, "    repo.name.\"%s\"\n", list[i].repo_name);
        fprintf(f, "    repo.io_link.\"%s\"\n", list[i].io_link);
        fprintf(f, "    ---\n");
    }
    fprintf(f, "end.avis.gateway\n");
    fclose(f);
    printf("[+] EXPORT SUCCESS: Manifest saved to '%s' (%d records mapped)\n", filename, count);
}

// AVIS: function_import | source="gateway.avis" | mode="assembly"
void avis_import_artifacts(const char *filename) {
    FILE *f = fopen(filename, "r");
    if (!f) {
        printf("[!] Import Failure: Unable to read manifest '%s'\n", filename);
        return;
    }

    char line[MAX_LINE_LEN];
    char current_root[MAX_VAL_LEN] = {0};
    char current_name[MAX_VAL_LEN] = {0};
    char current_link[MAX_VAL_LEN] = {0};

    printf("\n[*] IMPORT INITIALIZED: Reading map blueprint...\n");
    printf("==================================================\n");

    while (fgets(line, sizeof(line), f)) {
        line[strcspn(line, "\r\n")] = 0;

        if (strstr(line, "repo.root.")) {
            extract_quoted_value(line, "repo.root.", current_root);
        } else if (strstr(line, "repo.name.")) {
            extract_quoted_value(line, "repo.name.", current_name);
        } else if (strstr(line, "repo.io_link.")) {
            extract_quoted_value(line, "repo.io_link.", current_link);
        } else if (strstr(line, "---")) {
            if (strlen(current_root) > 0 && strlen(current_name) > 0) {
                printf("[VEC] Target Resolved: %s/%s\n", current_root, current_name);
                printf("      Live File Pointer: %s\n\n", current_link);
            }
            current_root = '\0';
            current_name = '\0';
            current_link = '\0';
        }
    }
    fclose(f);
    printf("==================================================\n");
    printf("[+] IMPORT COMPLETED: Core resources aligned.\n");
}

int main() {
    // AVIS: constellation_matrix | host="://github.com" | total_nodes=3
    AvisArtifact constellation[] = {
        {
            // AVIS: node_0 | repo="AVIS-DATALAKE"
            .repo_root = "https://://github.com",
            .repo_name = "AVIS-DATALAKE",
            .io_link   = "https://github.io"
        },
        {
            // AVIS: node_1 | repo="Cyborg"
            .repo_root = "https://://github.com",
            .repo_name = "Cyborg",
            .io_link   = "https://github.io"
        },
        {
            // AVIS: node_2 | repo="Sentinel"
            .repo_root = "https://://github.com",
            .repo_name = "Sentinel",
            .io_link   = "https://github.io"
        }
    };

    int record_count = sizeof(constellation) / sizeof(constellation[0]);
    const char *target_file = "gateway.avis";

    avis_export_artifacts(target_file, constellation, record_count);
    avis_import_artifacts(target_file);

    return 0;
}
