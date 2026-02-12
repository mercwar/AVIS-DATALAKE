#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

#define FIREGEM_GATE ((volatile uint8_t*)0x7000)

void firegem_signal(uint8_t code)
{
    __asm__ __volatile__ (
        "movb %0, (%1)\n\t"
        :
        : "r"(code), "r"(FIREGEM_GATE)
        : "memory"
    );
}

int main(int argc, char** argv)
{
    if (argc < 2)
    {
        printf("Usage: firegem_unzip <kb_file>\n");
        return 1;
    }

    const char* kbFile = argv[1];

    printf("[FireGem] Installing KB Packet: %s\n", kbFile);

    // KB packets are ZIP files with a .kb extension
    char command[512];
    snprintf(command, sizeof(command),
             "unzip -o %s -d dl/", kbFile);

    int result = system(command);

    if (result != 0)
    {
        printf("[FireGem] ERROR: Failed to unzip KB packet.\n");
        firegem_signal(0xFF); // failure
        return 2;
    }

    printf("[FireGem] KB Packet Installed.\n");

    // Signal FireGem that KB install succeeded
    firegem_signal(0x02);

    return 0;
}
