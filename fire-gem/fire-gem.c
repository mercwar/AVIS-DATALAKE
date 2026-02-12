#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    // 1. Ensure the YAML passed the GUID from the INI
    if (argc < 2) {
        fprintf(stderr, "[CRITICAL] No GUID provided for hardware boot.\n");
        return 1;
    }

    // 2. Convert GUID string to unsigned long long to match the header
    unsigned long long guid_val = strtoull(argv[1], NULL, 16);

    // 3. BOOT: Fixes 'too few arguments' by passing the guid_val
    printf("[C-BOOT] Initializing Hardware with GUID: %llX\n", guid_val);
    run_asm_logic(guid_val); 

    return 0;
}
