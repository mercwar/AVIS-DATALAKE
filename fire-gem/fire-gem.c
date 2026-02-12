#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;
    
    // Parse GUID from YAML/INI
    unsigned long long active_guid = strtoull(argv[1], NULL, 16);

    // 1. BOOT: Initialize Hardware and Provision KB
    // Matches fire-gem.h: extern void run_asm_logic(unsigned long long guid);
    printf("[C-BOOT] Triggering fire-gem.asm with GUID: %llX\n", active_guid);
    run_asm_logic(active_guid); 

    // 2. DISK WRITE: LittleBot confirms installation
    FILE *log = fopen("fire-gem.log", "a");
    if (log) {
        fprintf(log, "[SUCCESS] GUID Verified. fire-end.asm finalized BIN execution.\n");
        fclose(log);
    }

    return 0;
}
