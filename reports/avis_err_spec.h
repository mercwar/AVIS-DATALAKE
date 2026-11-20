/* ============================================================================
 * FILE: avis_err_spec.h
 * DOC_ID: AVIS-ERR-SPEC-2026.11-C-HEADER-R2
 * VERSION: 3.0.1-MERCWAR-FINAL
 * AUTHORITY: SOVEREIGN_WORKSPACE_DIAGNOSTICS
 * DESCRIPTION: Pure C / MSVC Master Fault Code & Runtime Invariant Registry
 *              Covering All 21 Volumes (67 Deterministic Fault Nodes: v1.0-v3.0)
 * ============================================================================ */

#ifndef AVIS_ERR_SPEC_H
#define AVIS_ERR_SPEC_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

#define AVIS_ERR_SPEC_VERSION_MAJOR 3
#define AVIS_ERR_SPEC_VERSION_MINOR 0
#define AVIS_ERR_SPEC_VERSION_PATCH 1
#define AVIS_ERR_SPEC_TOTAL_NODES   67

typedef enum AVIS_ErrorCode {
    AVIS_OK = 0x00000000U,

    /* VOL 01 [v1.0]: Memory, Native C, Telemetry, Shell & Config */
    AVIS_ERR_C_001    = 0x01010001U, /* snprintf truncation / format width mismatch */
    AVIS_ERR_C_002    = 0x01010002U, /* Destructive tokenization / multi-dot extension check */
    AVIS_ERR_NET_001  = 0x01020001U, /* HTTP POST / JSON raw HTML/CSS delimiter collision */
    AVIS_ERR_NET_002  = 0x01020002U, /* PHP $_POST undefined key / namespace collision */
    AVIS_ERR_SH_001   = 0x01030001U, /* Windows CMD/PowerShell inline JSON quote stripping */
    AVIS_ERR_SH_002   = 0x01030002U, /* Batch unquoted path / missing errorlevel exit */
    AVIS_ERR_CFG_001  = 0x01040001U, /* Credential exposure or mock data in JSON/AVIS */

    /* VOL 02 [v1.1]: Filesystem, SQLite Datalake, Parser & Subprocesses */
    AVIS_ERR_FS_001   = 0x02050001U, /* Symlink loop / MAX_PATH / self-ingestion crawl */
    AVIS_ERR_FS_002   = 0x02050002U, /* Non-atomic file write / lock contention */
    AVIS_ERR_DB_001   = 0x02060001U, /* SQLITE_BUSY / missing WAL & transaction batching */
    AVIS_ERR_DB_002   = 0x02060002U, /* Unparameterized SQL string interpolation */
    AVIS_ERR_PRS_001  = 0x02070001U, /* Premature AVIS/Firelang block delimiter termination */
    AVIS_ERR_PRS_002  = 0x02070002U, /* UTF-8 BOM / CRLF vs LF line-ending drift */
    AVIS_ERR_PROC_001 = 0x02080001U, /* Child process stdout/stderr 4KB pipe deadlock */

    /* VOL 03 [v1.2]: Frontend DOM, GGUF Inference & Gate Recovery */
    AVIS_ERR_UI_001   = 0x03090001U, /* Unsafe innerHTML injection vs textContent */
    AVIS_ERR_UI_002   = 0x03090002U, /* Unbatched high-frequency DOM reflow lockup */
    AVIS_ERR_INF_001  = 0x030A0001U, /* GGUF magic/alignment or VRAM/RAM OOM on load */
    AVIS_ERR_INF_002  = 0x030A0002U, /* Unstripped markdown fences / truncated LLM output */
    AVIS_ERR_REC_001  = 0x030B0001U, /* Crashed-gate infinite retry storm */

    /* VOL 04 [v1.3]: Win32 ABI, Registry, Catalogs & Winsock */
    AVIS_ERR_WIN_001  = 0x040C0001U, /* Unanchored DLL load / calling convention mismatch */
    AVIS_ERR_WIN_002  = 0x040C0002U, /* Registry handle leak / WOW64 redirection / REG_SZ null */
    AVIS_ERR_CAT_001  = 0x040D0001U, /* Stale .cat hashes / unquoted MakeCAB .ddf paths */
    AVIS_ERR_SOCK_001 = 0x040E0001U, /* Partial Winsock recv() / missing socket timeouts */

    /* VOL 05 [v1.4]: Multithreading, Named Pipes & CNG Crypto */
    AVIS_ERR_THR_001  = 0x050F0001U, /* AB-BA mutex deadlock / blocking WndProc */
    AVIS_ERR_THR_002  = 0x050F0002U, /* WideChar conversion leak / null off-by-one */
    AVIS_ERR_IPC_001  = 0x05100001U, /* Unframed Named Pipe stream / broken-pipe crash */
    AVIS_ERR_CRY_001  = 0x05110001U, /* Weak PRNG / text-mode file hashing / CNG leak */

    /* VOL 06 [v1.5]: PE Inspection, Virtual Memory & Debug API */
    AVIS_ERR_PE_001   = 0x06120001U, /* Out-of-bounds PE32/PE32+ header / RVA translation */
    AVIS_ERR_MEM_001  = 0x06130001U, /* ReadProcessMemory on PAGE_GUARD / uncommitted pages */
    AVIS_ERR_DBG_001  = 0x06140001U, /* Leaked debug-event hFile / unhandled first-chance BP */
    AVIS_ERR_DBG_002  = 0x06140002U, /* Heap allocation inside UnhandledExceptionFilter */

    /* VOL 07 [v1.6]: Windows Services, COM/WMI & Serial Device I/O */
    AVIS_ERR_SVC_001  = 0x07150001U, /* SCM Error 1053 timeout / missing --console fallback */
    AVIS_ERR_COM_001  = 0x07160001U, /* COM apartment mismatch / unvalidated WMI VARIANT */
    AVIS_ERR_DEV_001  = 0x07170001U, /* Missing \\.\COMx prefix / unconfigured COMMTIMEOUTS */

    /* VOL 08 [v1.7]: WebView2, Build Toolchains & PowerShell WSC */
    AVIS_ERR_WV2_001  = 0x08180001U, /* Premature WebView2 Navigate() / shared userDataFolder */
    AVIS_ERR_WV2_002  = 0x08180002U, /* Unescaped PostWebMessageAsJson / CoTaskMemFree leak */
    AVIS_ERR_BLD_001  = 0x08190001U, /* /MT vs /MD CRT mismatch / subsystem entry LNK2019 */
    AVIS_ERR_PS_001   = 0x081A0001U, /* Unprivileged regsvr32 vs script: moniker binding */

    /* VOL 09 [v1.8]: OpenGL, Spatial Kinematics & WASAPI Audio */
    AVIS_ERR_GFX_001  = 0x091B0001U, /* Unbound HGLRC context / unchecked shader compile log */
    AVIS_ERR_KIN_001  = 0x091C0001U, /* Zero-vector normalization NaN / Euler gimbal flip */
    AVIS_ERR_AUD_001  = 0x091D0001U, /* Audio callback I/O stall / device invalidation crash */

    /* VOL 10 [v1.9]: DirectX 12, Registry Wrappers & SwapChain Sync */
    AVIS_ERR_DX12_001 = 0x0A1E0001U, /* CommandAllocator Reset before GPU fence completion */
    AVIS_ERR_DX12_002 = 0x0A1E0002U, /* Descriptor heap overflow / root signature mismatch */
    AVIS_ERR_REG_001  = 0x0A1F0001U, /* Missing /reg:64 flag or SHChangeNotify refresh */
    AVIS_ERR_VSYNC_001= 0x0A200001U, /* WM_ERASEBKGND flicker / legacy swap-chain discard */

    /* VOL 11 [v2.0]: WinHTTP TLS, PHP 8.5+ & Edge MV3 Native Host */
    AVIS_ERR_HTTP_001 = 0x0B210001U, /* Static WinHTTP buffer vs QueryDataAvailable loop */
    AVIS_ERR_PHP_001  = 0x0B220001U, /* Unanchored PHP includes / missing JSON_THROW_ON_ERROR */
    AVIS_ERR_EXT_001  = 0x0B230001U, /* Text-mode stdout CRLF corruption in MV3 Native Host */

    /* VOL 12 [v2.1]: GitHub API Sync, Layered Windows & MMAP I/O */
    AVIS_ERR_GIT_001  = 0x0C240001U, /* Missing GitHub blob SHA on PUT / rate-limit burst */
    AVIS_ERR_HOLO_001 = 0x0C250001U, /* Straight-alpha halo on WS_EX_LAYERED / WM_PAINT mix */
    AVIS_ERR_MMAP_001 = 0x0C260001U, /* CreateFileMapping on 0-byte file / unaligned offset */

    /* VOL 13 [v2.2]: Job Objects, Singleton Mutexes & DPI Glass UI */
    AVIS_ERR_JOB_001  = 0x0D270001U, /* Orphaned child processes without KILL_ON_JOB_CLOSE */
    AVIS_ERR_SYNC_001 = 0x0D280001U, /* Duplicate daemon instance without Local\ mutex */
    AVIS_ERR_DPI_001  = 0x0D290001U, /* Unscaled 96-DPI layout / unguarded DWM attribute */

    /* VOL 14 [v2.3]: ANSI VT Sequences, DPAPI Secrets & FS Watchers */
    AVIS_ERR_VT_001   = 0x0E2A0001U, /* Unenabled ENABLE_VIRTUAL_TERMINAL_PROCESSING / UTF-8 */
    AVIS_ERR_SEC_001  = 0x0E2B0001U, /* Plaintext PAT in memory/config vs DPAPI/SecureZero */
    AVIS_ERR_MON_001  = 0x0E2C0001U, /* ReadDirectoryChangesW buffer overflow / partial lock */

    /* VOL 15 [v2.4]: XML Sitemaps, Monotonic Timers & Shell Drops */
    AVIS_ERR_XML_001  = 0x0F2D0001U, /* Unescaped XML entities / >50,000 URL sitemap limit */
    AVIS_ERR_TMR_001  = 0x0F2E0001U, /* Wall-clock delta-time spike vs QPC clamped dt */
    AVIS_ERR_SHL_001  = 0x0F2F0001U, /* Leaked HDROP handle / post-SetClipboardData free */

    /* VOL 16 [v2.5]: Raw Input, Cabinet Extraction & GDI/D2D */
    AVIS_ERR_INP_001  = 0x10300001U, /* Fixed RAWINPUT buffer / stuck keys on WM_KILLFOCUS */
    AVIS_ERR_ARC_001  = 0x10310001U, /* Archive path traversal outside target root */
    AVIS_ERR_GDI_001  = 0x10320001U, /* Deleting selected GDI object / D2DERR_RECREATE_TARGET */

    /* VOL 17 [v2.6]: WIC Codecs, System Tray & Loopback Ports */
    AVIS_ERR_IMG_001  = 0x11330001U, /* Unaligned WIC row stride / non-PBGRA pixel format */
    AVIS_ERR_TRY_001  = 0x11340001U, /* Missing TaskbarCreated tray icon rehydration */
    AVIS_ERR_PRT_001  = 0x11350001U, /* 0.0.0.0 LAN bind / hardcoded port collision */

    /* VOL 18 [v2.7]: Task Scheduler, WinMM MIDI & Binary Anchors */
    AVIS_ERR_TSK_001  = 0x12360001U, /* Relative scheduled task path / console flash */
    AVIS_ERR_MID_001  = 0x12370001U, /* Unpaired timeBeginPeriod / hanging MIDI sustain */
    AVIS_ERR_ENV_001  = 0x12380001U, /* GetCurrentDirectory vs GetModuleFileNameW root */

    /* VOL 19 [v2.8]: 3D Holographic JSON, UAC Tokens & Checkpoints */
    AVIS_ERR_3D_001   = 0x13390001U, /* Non-finite NaN/Inf or zero-scale 3D JSON node */
    AVIS_ERR_UAC_001  = 0x133A0001U, /* Infinite UAC runas loop / UIPI message block */
    AVIS_ERR_CHK_001  = 0x133B0001U, /* Premature datalake checkpoint before ACK */

    /* VOL 19B [v2.9]: JSONL Rotation, Multi-Monitor & KV-Cache Pruning */
    AVIS_ERR_LOG_001  = 0x133C0001U, /* Unbounded JSONL log growth / partial append write */
    AVIS_ERR_MON_002  = 0x133D0001U, /* Off-screen window restore outside active rcWork */
    AVIS_ERR_KV_001   = 0x133E0001U, /* Local LLM KV-cache overflow / system prompt eviction */

    /* VOL 20 [v3.0]: Sovereign Trust, Agent Routing & HW Envelope */
    AVIS_ERR_SOV_001  = 0x143F0001U, /* Unverified Authenticode / SHA-256 manifest drift */
    AVIS_ERR_AGT_001  = 0x14400001U, /* Greeting parser crash / guessed or mock synthesis */
    AVIS_ERR_HW_001   = 0x14410001U  /* Thread oversubscription / >6GB RAM/VRAM overrun */
} AVIS_ErrorCode;

typedef struct AVIS_FaultDescriptor {
    AVIS_ErrorCode code;
    const char    *tag;
    const char    *version;
    const char    *invariant_summary;
} AVIS_FaultDescriptor;

/* Deterministic Fault Emission Helper */
static inline void AVIS_EmitFault(
    FILE *stream,
    AVIS_ErrorCode code,
    const char *tag,
    const char *file,
    int line,
    const char *detail
) {
    if (!stream) {
        stream = stderr;
    }
    fprintf(
        stream,
"[AVIS_FAULT] CODE=0x%08X TAG=%s LOC=%s:%d DETAIL="%s"\n",
(unsigned int)code,
tag ? tag : "ERR-UNKNOWN",
file ? file : "unknown",
line,
detail ? detail : "Invariant violation"
);
}
/* Runtime Invariant Guard Macros */
#define AVIS_GUARD(cond, code, tag, detail, fail_label) 
do { 
if (!(cond)) { 
AVIS_EmitFault(stderr, (code), (tag), FILE, LINE, (detail)); 
goto fail_label; 
} 
} while (0)
#define AVIS_GUARD_RET(cond, code, tag, detail) 
do { 
if (!(cond)) { 
AVIS_EmitFault(stderr, (code), (tag), FILE, LINE, (detail)); 
return (code); 
} 
} while (0)
#ifdef __cplusplus
}
#endif
#endif /* AVIS_ERR_SPEC_H */
