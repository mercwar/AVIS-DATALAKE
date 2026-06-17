/* AIFVS-ARTIFACT : guid_reader.c */
#include <avis.h>

int main() {
    GUID_Init();
    GUID_LoadAll("/DL");
    GUID_TraceChains();
    GUID_Export("/DL/guid_map");
    return 0;
}
