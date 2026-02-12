#ifndef FIRE_GEM_H
#define FIRE_GEM_H

/* ASM Hardware Gate - 32-bit GUID in EDI */
extern void run_asm_logic(unsigned int guid);

/* ASM Binary Executor - Manual Trigger */
extern void fire_end_entry();

#endif
