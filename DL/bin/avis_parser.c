/* AIFVS-ARTIFACT : avis_parser.c */
#include <avis.h>

int main() {
    AVIS_Init();
    AVIS_Scan("/DL-AVIS");
    AVIS_ParseAll();
    AVIS_EmitIndex("/DL/avis_index");
    return 0;
}
