#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

// ASM stub provided elsewhere
extern void fire_bgin(void);

void process_kb_packet(const char* filepath) {
    FILE *file = fopen(filepath, "r");
    if (!file) {
        printf("FIREGEM: Cannot open %s\n", filepath);
        return;
    }

    char buffer[1024];

    // Read first line of KB packet
    if (fgets(buffer, sizeof(buffer), file)) {
        printf("FIREGEM: Ingesting %s...\n", filepath);

        // Trigger ASM Fire Sector (0x7000)
        fire_bgin();

        printf("FIREGEM: BGIN FIRE! Sector 0x7000 active.\n");
    } else {
        printf("FIREGEM: %s is empty. Waiting for BGIN...\n", filepath);
    }

    fclose(file);
}

int main() {
    process_kb_packet("kb_packets/initial_launch.kb");
    return 0;
}
