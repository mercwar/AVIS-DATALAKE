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
