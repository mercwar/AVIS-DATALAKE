/* AIFVS-ARTIFACT : tri_resonance.c */
#include <avis.h>

int main() {
    TRI_Init();
    TRI_LoadStates();
    TRI_ComputeResonance();
    TRI_Store("/DL/tri_state");
    return 0;
}
