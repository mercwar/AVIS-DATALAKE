Locked. Delivering **code only**, no persona, no ceremony.
Below are **7 fully expanded stub bodies**, **BNF → C header translation**, and a **Win32 message enum block** you can drop straight into AVIS artifacts.

---

# 1) `avis_core.h`

```c
#ifndef AVIS_CORE_H
#define AVIS_CORE_H

/* AVIS Core — declarative only */
#define AVIS_MAGIC 0x41564953  /* 'AVIS' */
#define AVIS_VERSION_MAJOR 1
#define AVIS_VERSION_MINOR 0

typedef struct _AVIS_CONTEXT {
    unsigned int magic;
    unsigned int version;
    const char*  owner;
    const char*  authority;
    unsigned int flags;
} AVIS_CONTEXT;

int AVIS_Init(AVIS_CONTEXT* ctx);
int AVIS_Verify(const AVIS_CONTEXT* ctx);
void AVIS_Shutdown(AVIS_CONTEXT* ctx);

#endif
```

---

# 2) `avis_core.c`

```c
#include "avis_core.h"

int AVIS_Init(AVIS_CONTEXT* ctx) {
    if (!ctx) return -1;
    ctx->magic = AVIS_MAGIC;
    ctx->version = (AVIS_VERSION_MAJOR << 16) | AVIS_VERSION_MINOR;
    ctx->flags = 0;
    return 0;
}

int AVIS_Verify(const AVIS_CONTEXT* ctx) {
    if (!ctx) return -1;
    if (ctx->magic != AVIS_MAGIC) return -2;
    return 0;
}

void AVIS_Shutdown(AVIS_CONTEXT* ctx) {
    if (!ctx) return;
    ctx->flags = 0;
}
```

---

# 3) `cyhy_vector.h`

```c
#ifndef CYHY_VECTOR_H
#define CYHY_VECTOR_H

typedef enum {
    CYHY_VEC_NULL = 0,
    CYHY_VEC_INDEX,
    CYHY_VEC_SCAN,
    CYHY_VEC_PORT,
    CYHY_VEC_ASSERT,
    CYHY_VEC_TERMINATE
} CYHY_VECTOR_ID;

typedef struct {
    CYHY_VECTOR_ID id;
    const char*    name;
    unsigned long  signature;
} CYHY_VECTOR;

#endif
```

---

# 4) `cyhy_vector.c`

```c
#include "cyhy_vector.h"

CYHY_VECTOR CYHY_VectorTable[] = {
    { CYHY_VEC_NULL,      "NULL",      0x00000000 },
    { CYHY_VEC_INDEX,     "INDEX",     0xCYHY0001 },
    { CYHY_VEC_SCAN,      "SCAN",      0xCYHY0002 },
    { CYHY_VEC_PORT,      "PORT",      0xCYHY0003 },
    { CYHY_VEC_ASSERT,    "ASSERT",    0xCYHY0004 },
    { CYHY_VEC_TERMINATE, "TERMINATE", 0xCYHYFFFF }
};
```

---

# 5) `mercg_gate.h`

```c
#ifndef MERCG_GATE_H
#define MERCG_GATE_H

#define MERCG_NO_CMT  0x0001
#define MERCG_OK      0x0000

int MERCG_CheckCompliance(unsigned int flags);

#endif
```

---

# 6) `mercg_gate.c`

```c
#include "mercg_gate.h"

int MERCG_CheckCompliance(unsigned int flags) {
    if (flags & MERCG_NO_CMT)
        return MERCG_NO_CMT;
    return MERCG_OK;
}
```

---

# 7) `avis_loader_stub.c`

```c
#include "avis_core.h"

/* Loader stub — non-executing */
int AVIS_Loader_Map(unsigned long address) {
    /* Symbolic mapping only */
    (void)address;
    return 0;
}
```

---

## BNF → C HEADER TRANSLATION

### `AVIS.bnf`

```
<avis>        ::= <header> <body>
<header>      ::= "AVIS" <version>
<body>        ::= <directive> | <directive> <body>
<directive>   ::= "INDEX" | "SCAN" | "PORT" | "ASSERT"
<version>     ::= DIGIT "." DIGIT
```

### Generated: `avis_grammar.h`

```c
#ifndef AVIS_GRAMMAR_H
#define AVIS_GRAMMAR_H

typedef enum {
    AVIS_DIR_INDEX,
    AVIS_DIR_SCAN,
    AVIS_DIR_PORT,
    AVIS_DIR_ASSERT
} AVIS_DIRECTIVE;

typedef struct {
    int major;
    int minor;
} AVIS_VERSION;

typedef struct {
    AVIS_VERSION version;
    AVIS_DIRECTIVE directive;
} AVIS_GRAMMAR_NODE;

#endif
```

---

## WIN32 MESSAGE ENUM BLOCK

**(Canonical, index-ready, no behavior)**

```c
#ifndef AVIS_WINMSG_ENUM_H
#define AVIS_WINMSG_ENUM_H

typedef enum {
    AVIS_WM_NULL            = 0x0000,
    AVIS_WM_CREATE          = 0x0001,
    AVIS_WM_DESTROY         = 0x0002,
    AVIS_WM_MOVE            = 0x0003,
    AVIS_WM_SIZE            = 0x0005,
    AVIS_WM_ACTIVATE        = 0x0006,
    AVIS_WM_SETFOCUS        = 0x0007,
    AVIS_WM_KILLFOCUS       = 0x0008,
    AVIS_WM_ENABLE          = 0x000A,
    AVIS_WM_SETREDRAW       = 0x000B,
    AVIS_WM_SETTEXT         = 0x000C,
    AVIS_WM_GETTEXT         = 0x000D,
    AVIS_WM_GETTEXTLENGTH   = 0x000E,
    AVIS_WM_PAINT           = 0x000F,
    AVIS_WM_CLOSE           = 0x0010,
    AVIS_WM_QUERYENDSESSION = 0x0011,
    AVIS_WM_QUIT            = 0x0012,
    AVIS_WM_QUERYOPEN       = 0x0013,
    AVIS_WM_ERASEBKGND      = 0x0014,
    AVIS_WM_SYSCOLORCHANGE  = 0x0015,
    AVIS_WM_ENDSESSION      = 0x0016,
    AVIS_WM_SHOWWINDOW      = 0x0018,
    AVIS_WM_SETTINGCHANGE  = 0x001A,
    AVIS_WM_ACTIVATEAPP     = 0x001C,
    AVIS_WM_FONTCHANGE     = 0x001D,
    AVIS_WM_TIMECHANGE     = 0x001E,
    AVIS_WM_CANCELMODE     = 0x001F,
    AVIS_WM_SETCURSOR      = 0x0020,
    AVIS_WM_MOUSEACTIVATE  = 0x0021,
    AVIS_WM_CHILDACTIVATE  = 0x0022,
    AVIS_WM_QUEUESYNC      = 0x0023,
    AVIS_WM_GETMINMAXINFO  = 0x0024,
    AVIS_WM_KEYDOWN        = 0x0100,
    AVIS_WM_KEYUP          = 0x0101,
    AVIS_WM_CHAR           = 0x0102,
    AVIS_WM_SYSKEYDOWN     = 0x0104,
    AVIS_WM_SYSKEYUP       = 0x0105,
    AVIS_WM_MOUSEMOVE      = 0x0200,
    AVIS_WM_LBUTTONDOWN    = 0x0201,
    AVIS_WM_LBUTTONUP      = 0x0202,
    AVIS_WM_RBUTTONDOWN    = 0x0204,
    AVIS_WM_RBUTTONUP      = 0x0205,
    AVIS_WM_MBUTTONDOWN    = 0x0207,
    AVIS_WM_MBUTTONUP      = 0x0208,
    AVIS_WM_MOUSEWHEEL     = 0x020A,
    AVIS_WM_MOUSEHWHEEL    = 0x020E,
    AVIS_WM_USER           = 0x0400,
    AVIS_WM_APP            = 0x8000
} AVIS_WINMSG;

#endif
```

---

### NEXT CYCLE OPTIONS (pick one, no questions):

* Expand **VB6 / COM `.cls + .idl` stubs**
* Emit **PERL + CMD port chain**
* Generate **CBORD + CYHY schema files**
* Collapse all into **single mega-manifest index**

Say the word.
