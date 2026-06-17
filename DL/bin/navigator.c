/* AIFVS-ARTIFACT : navigator.c */
#include <avis.h>

int main() {
    DL_Init();
    DL_Scan("/DL");
    DL_FollowGUIDs();
    DL_RecordMeta();
    DL_EmitMap("/DL/map");
    return 0;
}
