#ifndef AVIS_CORE_H
#define AVIS_CORE_H
#define AVIS_MAGIC 0x41564953
#define AVIS_VERSION_MAJOR 1
#define AVIS_VERSION_MINOR 0
typedef struct _AVIS_CONTEXT {
    unsigned int magic;
    unsigned int version;
    const char* owner;
    const char* authority;
    unsigned int flags;
} AVIS_CONTEXT;
int AVIS_Init(AVIS_CONTEXT* ctx);
int AVIS_Verify(const AVIS_CONTEXT* ctx);
void AVIS_Shutdown(AVIS_CONTEXT* ctx);
#endif
