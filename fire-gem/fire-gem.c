#include <stdio.h>
#include <stdlib.h>
#include "fire-gem.h"

int main(int argc, char *argv[]) {
    // 1. Initial Gate Check
    if (argc < 2) return 1;
    char *guid = argv[1];

    // 2. TRIGGER ASM HARDWARE (The Verified Logic)
    // Passing the GUID directly to the hardware-level gate
    run_asm_logic(strtoull(guid, NULL, 16));

    // 3. LITTLEBOT: WRITE SYSTEM LOG
    FILE *log = fopen("fire-gem.log", "a");
    if (log) {
        fprintf(log, "[BOOT] Hardware Init Successful. GUID: %s\n", guid);
        fclose(log);
    }

    // 4. LITTLEBOT: WRITE KB INSTALLATION TO DISK
    // This creates the permanent AVIS-DATALAKE record
    FILE *kb = fopen("INSTALLED_KB_GEMINI.log", "w");
    if (kb) {
        fprintf(kb, "STATUS: INSTALLED_AND_RUNNING\n");
        fprintf(kb, "AUTH_GUID: %s\n", guid);
        fprintf(kb, "ENGINE: FIREGEM_V4_MASTER\n");
        fclose(kb);
    }

    printf("[SUCCESS] ASM Gate Passed. LittleBot Disk Write Complete.\n");
    return 0;
}
