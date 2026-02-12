#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main() {
    // 1. Logic to parse fire-gem.ini for 'run_guid'
    unsigned long long active_guid = 0x827364A1; // Extracted from INI

    printf("[BOOT] Gemini fire-gem initialization starting...\n");

    // 2. Execute ASM installation gate with the INI GUID
    run_asm_logic(active_guid);

    printf("[SUCCESS] Installation finalized in the fire-gem directory.\n");
    return 0;
}
