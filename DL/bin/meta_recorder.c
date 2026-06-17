/* AIFVS-ARTIFACT : meta_recorder.c */
#include <avis.h>

int main() {
    META_Init();
    META_CollectFrom("/DL");
    META_Write("/DL-ROOT/meta");
    return 0;
}
