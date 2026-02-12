#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    // 1. Ensure the YAML passed the GUID from the INI
    if (argc < 2) {
        fprintf(stderr, "[CRITICAL] No GUID provided for hardware boot.\n");
        return 1;
    }

    // 2. Convert GUID string to unsigned long long to match fire-gem.h
    unsigned long long active_guid = strtoull(argv[1], NULL, 16);

    // 3. BOOT: Pass the GUID to the hardware gate (Fixes 'too few arguments')
    printf("[C-BOOT] Initializing Hardware with GUID: %llX\n", active_guid);
    run_asm_logic(active_guid); 

    return 0;
}
