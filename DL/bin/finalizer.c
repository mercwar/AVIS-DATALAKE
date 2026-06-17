/* AIFVS-ARTIFACT : finalizer.c */
#include <avis.h>

int main() {
    FINAL_Init();
    FINAL_CheckIntegrity("/DL");
    FINAL_Seal("/DL-ROOT");
    FINAL_EmitStatus("/DL/status");
    return 0;
}
