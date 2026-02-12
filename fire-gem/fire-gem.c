#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "fire-gem.h"

void log_status(const char* message) {
    FILE *log = fopen("fire-gem.log", "a");
    if (log) {
        fprintf(log, "[%ld] %s\n", time(NULL), message);
        fclose(log);
    }
}

void finalize_kb_write(const char* kb_id, const char* guid) {
    char filename[64];
    sprintf(filename, "INSTALLED_%s.log", kb_id);
    
    FILE *kb = fopen(filename, "w");
    if (kb) {
        fprintf(kb, "STATUS: INSTALLED_AND_RUNNING\nGUID: %s\n", guid);
        fclose(kb);
        printf("[LITTLEBOT] KB Written to Disk: %s\n", filename);
    }
}
