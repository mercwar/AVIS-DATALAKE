// Location: /src/core/main.c
#include <stdint.h>

void load_to_virtual_ram(uint64_t target_address, uint64_t data_val) {
    // Standard x86 ASM embedded in C for Windows/Linux compatibility
    __asm__ __volatile__ (
        "movq %[val], %%rax\n\t"  // Load value into register
        "movq %%rax, (%[addr])"    // Move to the emulated RAM address
        :
        : [addr] "r" (target_address), [val] "r" (data_val)
        : "%rax", "memory"
    );
}
