#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;
    
    // Convert the GUID string from the INI/YAML into a number for the ASM
    unsigned long long active_guid = strtoull(argv[1], NULL, 16);

    // STEP 1: Boot Hardware (Now passing the required GUID)
    printf("[C-BOOT] Opening Hardware Logic with GUID: %llX\n", active_guid);
    run_asm_logic(active_guid); 

    // STEP 2: Trigger SH Stub for LittleBot disk writes
    char command[256];
    snprintf(command, sizeof(command), "bash fire-gem.sh %s", argv[1]);
    return system(command);
}
