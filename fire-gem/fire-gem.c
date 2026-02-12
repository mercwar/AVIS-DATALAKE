#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;
    char *active_guid = argv[1];

    // Hardware Initialization (ASM)
    printf("[C-BOOT] Initializing Hardware with GUID: %s\n", active_guid);
    run_asm_logic(); 

    // TRIGGER SH STUB: LittleBot disk writing starts here
    char command[256];
    snprintf(command, sizeof(command), "bash fire-gem.sh %s", active_guid);
    return system(command);
}
