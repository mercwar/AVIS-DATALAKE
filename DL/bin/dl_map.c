/* AIFVS-ARTIFACT : dl_map.c */
#include <avis.h>

int main() {
    MAP_Init();
    MAP_LoadMeta("/DL-ROOT/meta");
    MAP_LoadGUIDs("/DL/guid_map");
    MAP_LoadAVIS("/DL/avis_index");
    MAP_Assemble();
    MAP_Write("/DL/final_map");
    return 0;
}
