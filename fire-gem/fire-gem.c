#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Critical: No Run GUID provided from INI.\n");
        return 1;
    }

    char *active_guid = argv[1];

    // STEP 1: INITIALIZE HARDWARE
    printf("[C-ENGINE] Booting... Initializing Hardware with GUID: %s\n", active_guid);
    run_asm_logic(); // Logic gate in fire-gem.asm

    // STEP 2: HANDOFF TO SHELL FOR BIN/KB SCANNING
    printf("[C-ENGINE] Hardware Ready. Triggering FVS Registry Scan...\n");
    
    char command[256];
    snprintf(command, sizeof(command), "./fire-gem.sh %s", active_guid);
    int result = system(command);

    if (result == 0) {
        printf("[C-ENGINE] Installation Cycle Finalized.\n");
    }

    return 0;
}
