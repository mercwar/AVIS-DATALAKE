#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    // 1. Validate that the GUID was loaded from the INI via YAML
    if (argc < 2) {
        fprintf(stderr, "[ERR] Missing Run GUID. Initialization aborted.\n");
        return 1;
    }

    // 2. Convert the GUID string into the unsigned long long required by the ASM
    unsigned long long active_guid = strtoull(argv[1], NULL, 16);

    // 3. BOOT: Trigger hardware logic (Fixes 'too few arguments' error)
    printf("[C-BOOT] Passing GUID %llX to fire-gem.asm...\n", active_guid);
    run_asm_logic(active_guid); 

    return 0;
}
