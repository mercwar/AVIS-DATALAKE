#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;
    
    // Parse the 32-bit GUID from the INI/YAML load
    uint32_t active_guid = (uint32_t)strtoul(argv[1], NULL, 16);

    // BOOT: Passing 32-bit GUID to fire-gem.asm
    // Fixed: Passing the variable to resolve 'too few arguments'
    printf("[C-BOOT] Initializing HW with 32-bit GUID: %08X\n", active_guid);
    run_asm_logic(active_guid); 

    return 0;
}
