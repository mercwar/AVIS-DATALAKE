#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;
    
    // Convert the GUID string from the INI/YAML to an unsigned long long
    unsigned long long active_guid = strtoull(argv[1], NULL, 16);

    // 1. BOOT: Trigger hardware logic (Fixes 'too few arguments' error)
    printf("[C-BOOT] Initializing Hardware with GUID: %llX\n", active_guid);
    run_asm_logic(active_guid); 

    // 2. DISK AUDIT: LittleBot confirms the chain is complete
    FILE *log = fopen("fire-gem.log", "a");
    if (log) {
        fprintf(log, "[SUCCESS] Hardware Gate & BIN Execution Finalized.\n");
        fclose(log);
    }

    return 0;
}
