/* Location: /dl/avis_index.c */
#include <stdint.h>

// This AVIS function maps the AI's requested address to the KB Pack offset
uint64_t get_avis_ptr(uint64_t ai_submitted_addr) {
    uint64_t physical_ptr;
    
    // x86 ASM to quickly resolve the address in the local Windows server
    __asm__ __volatile__ (
        "movq %1, %%rax\n\t"  // Load submitted address
        "addq $0x1000, %%rax\n\t" // Apply AVIS memory offset
        "movq %%rax, %0"      // Return the physical pointer
        : "=r" (physical_ptr)
        : "r" (ai_submitted_addr)
        : "%rax"
    );
    
    return physical_ptr;
}
