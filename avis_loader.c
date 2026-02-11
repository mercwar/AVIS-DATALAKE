#include <windows.h>
#include <stdio.h>
#include "merc_g.h" // Definitions for MERC_G_TABLE and LANE_ID
#include "cyhy_abi.h" // Definitions for Signal IDs and Routing

// Pointer to the Kernel Router
extern HRESULT __stdcall Cyhy_Kernel_Route(int SigID, void* Buffer, long Size);

void Process_Avis_Container(const char* mzPath) {
    FILE* fp = fopen(mzPath, "rb");
    if (!fp) return;

    // 1. Read Header and MERC-G Table
    MERC_G_TABLE table;
    fseek(fp, 0x0C, SEEK_SET); // Seek to MERC-G Vector Start
    fread(&table, sizeof(MERC_G_TABLE), 1, fp);

    // 2. Iterate through Vector Lanes
    for (int i = 0; i < table.VectorCount; i++) {
        char* name = table.Lane[i].Name;
        DWORD offset = table.Lane[i].Pointer;
        DWORD size = table.Lane[i].Size;

        // 3. Identification & Extraction
        if (strcmp(name, "VB6_GUI") == 0) {
            Extract_And_Compile_VB6(fp, offset, size);
        }
    }
    fclose(fp);
}

void Extract_And_Compile_VB6(FILE* mzHandle, DWORD offset, DWORD size) {
    // Write Segment to Temporary VBP File
    char* buffer = (char*)malloc(size);
    fseek(mzHandle, offset, SEEK_SET);
    fread(buffer, size, 1, mzHandle);

    FILE* vbp = fopen("temp_project.vbp", "wb");
    fwrite(buffer, size, 1, vbp);
    fclose(vbp);
    free(buffer);

    // 4. Command-Line Compilation via CYHY Bus
    // Note: /MAKE compiles the project silently
    char cmd[512];
    sprintf(cmd, "\"C:\\Program Files (x86)\\Microsoft Visual Studio\\VB98\\VB6.EXE\" /MAKE temp_project.vbp /OUTDIR .\\bin");
    
    Cyhy_Kernel_Route(CYHY_SIG_INIT, "Compiling VB6 Lane...", 21);
    system(cmd);
    Cyhy_Kernel_Route(CYHY_SIG_RENDER, "VB6 Binaries Extracted.", 24);
}
