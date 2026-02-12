#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;

    // Convert to 32-bit unsigned int (e.g., 0x827364A1)
    unsigned int active_guid = (unsigned int)strtoul(argv[1], NULL, 16);

    // BOOT: Passing the 32-bit GUID to the hardware gate
    printf("[C-BOOT] Initializing HW (32-bit: %08X)\n", active_guid);
    run_asm_logic(active_guid); 

    return 0;
}
