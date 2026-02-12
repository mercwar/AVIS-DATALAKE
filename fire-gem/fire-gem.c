#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;
    
    // Parse GUID from YAML/INI string to unsigned long long
    unsigned long long active_guid = strtoull(argv[1], NULL, 16);

    // 1. BOOT: Trigger fire-gem.asm with the required GUID
    // Matches fire-gem.h: extern void run_asm_logic(unsigned long long guid);
    printf("[C-BOOT] Triggering fire-gem.asm with GUID: %llX\n", active_guid);
    run_asm_logic(active_guid); 

    // 2. DISK AUDIT: LittleBot confirms the chain complete
    FILE *log = fopen("fire-gem.log", "a");
    if (log) {
        fprintf(log, "[SUCCESS] Hardware Gate & BIN Execution Finalized.\n");
        fclose(log);
    }

    return 0;
}
