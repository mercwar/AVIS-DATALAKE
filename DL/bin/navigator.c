/* ================================================================
   AVIS-ARTIFACT
   FILE: navigator.c
   LOCATION: /DL/bin
   PURPOSE:
       Symbolic teaching executable. AI interprets this program to
       learn how to traverse the datalake, follow GUID chains,
       inspect AVIS blocks, and record structural metadata.

   AIFVS-ARTIFACT
   ================================================================ */

#include <avis.h>

int main() {

    DL_Init();                 // initialize datalake context
    DL_Scan("/DL");            // scan entire datalake tree
    DL_FollowGUIDs();          // follow GUID chains in order
    DL_RecordMeta();           // store structural metadata
    DL_EmitMap("/DL/map");     // output symbolic map

    return 0;
}
