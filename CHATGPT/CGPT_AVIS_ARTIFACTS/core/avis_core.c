#include "avis_core.h"
int AVIS_Init(AVIS_CONTEXT* ctx){
 if(!ctx) return -1;
 ctx->magic=AVIS_MAGIC;
 ctx->version=(AVIS_VERSION_MAJOR<<16)|AVIS_VERSION_MINOR;
 ctx->flags=0;
 return 0;
}
int AVIS_Verify(const AVIS_CONTEXT* ctx){
 if(!ctx) return -1;
 if(ctx->magic!=AVIS_MAGIC) return -2;
 return 0;
}
void AVIS_Shutdown(AVIS_CONTEXT* ctx){ if(ctx) ctx->flags=0; }
