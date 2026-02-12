#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Critical: Missing GUID from INI.\n");
        return 1;
    }
    char *active_guid = argv[1];

    // BOOT PHASE 1: Hardware Initialization
    printf("[C-BOOT] Opening Hardware Logic with GUID: %s\n", active_guid);
    run_asm_logic(); 

    // BOOT PHASE 2: Trigger KB Scan & Disk Write
    printf("[C-BOOT] Hardware Ready. Executing KB Scan...\n");
    char command[256];
    snprintf(command, sizeof(command), "./fire-gem.sh %s", active_guid);
    
    // Handing off to the shell script
    return system(command);
}

