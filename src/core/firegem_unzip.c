#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <sys/mman.h>
#include <unistd.h>

static volatile uint8_t* FIREGEM_GATE = NULL;

static void firegem_init_gate(void)
{
    if (FIREGEM_GATE != NULL)
        return;

    long page_size = sysconf(_SC_PAGESIZE);
    if (page_size <= 0) page_size = 4096;

    void* addr = mmap(NULL,
                      (size_t)page_size,
                      PROT_READ | PROT_WRITE,
                      MAP_ANONYMOUS | MAP_PRIVATE,
                      -1,
                      0);

    if (addr == MAP_FAILED)
    {
        perror("mmap");
        exit(1);
    }

    FIREGEM_GATE = (volatile uint8_t*)addr;
    *FIREGEM_GATE = 0x00; // CLOSED
}

void firegem_signal(uint8_t code)
{
    firegem_init_gate();

    __asm__ __volatile__ (
        "movb %0, (%1)\n\t"
        :
        : "r"(code), "r"(FIREGEM_GATE)
        : "memory"
    );

    printf("[FireGem] Gate (emulated) set to 0x%02X\n", code);
}

int main(int argc, char** argv)
{
    const char* kbFile = NULL;

    // Priority 1: latest.kb (live updates)
    if (access("kb_packets/latest.kb", F_OK) == 0) {
        kbFile = "kb_packets/latest.kb";
        printf("[FireGem] Using latest.kb (live update).\n");
    }
    // Priority 2: initial_launch.kb (boot sector)
    else if (access("kb_packets/initial_launch.kb", F_OK) == 0) {
        kbFile = "kb_packets/initial_launch.kb";
        printf("[FireGem] Using initial_launch.kb (boot sector).\n");
    } else {
        printf("[FireGem] No KB file found (initial_launch.kb or latest.kb).\n");
        return 1;
    }

    printf("[FireGem] Installing KB Packet: %s\n", kbFile);

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
    firegem_signal(0x02); // SUCCESS / RAM READY

    return 0;
}
