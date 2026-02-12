const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log("--- JS: Compiling ASM to Disk ---");
    // Explicitly compile to object file
    execSync('nasm -f elf64 fire-gem.asm -o fire-gem-asm.o');
    
    if (fs.existsSync('./fire-gem-asm.o')) {
        console.log("[SUCCESS] fire-gem-asm.o verified on disk.");
    } else {
        throw new Error("File not found after compilation.");
    }
} catch (error) {
    console.error(`[CRITICAL] Compilation failed: ${error.message}`);
    process.exit(1);
}
