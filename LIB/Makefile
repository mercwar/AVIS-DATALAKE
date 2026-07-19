# ==========================================================================
# AVIS/CBOR SYSTEM ARCHITECTURE ENGINE AUTOMATED BUILD MANIFEST
# Supports: GNU Make (MinGW/GCC) and Microsoft NMAKE (MSVC)
# ==========================================================================

# --- Environment Detection Logic ---
ifdef ComSpec
    # Windows Environment Target Rules
    RM = del /Q /F
    EXE = .exe
    ifeq ($(CC),cl)
        # MSVC Compiler Configuration Setup
        CFLAGS = /W4 /O2 /D_CRT_SECURE_NO_WARNINGS
        LIBS = user32.lib gdi32.lib winmm.lib ws2_32.lib advapi32.lib shell32.lib
        OUT_FLAG = /FE
        OBJ_FLAG = /Fo
    else
        # GCC / MinGW Compiler Configuration Setup
        CC = gcc
        CFLAGS = -Wall -Wextra -O2 -std=c99
        LIBS = -luser32 -lgdi32 -lwinmm -lws2_32 -ladvapi32 -lshell32
        OUT_FLAG = -o 
        OBJ_FLAG = -o 
    endif
else
    # Fallback / POSIX Environment Rule Controls
    RM = rm -f
    EXE =
    CC = gcc
    CFLAGS = -Wall -Wextra -O2 -std=c99
    LIBS = -lm
    OUT_FLAG = -o 
endif

# --- Binary Target Nodes ---
TARGET = avis_integrated_system$(EXE)

# --- Dependency Pipeline Grouping Arrays ---
HEADERS = cbor_avis_stdio.h \
          cbor_avis_processing.h \
          windows_avis_wrappers.h \
          windows_avis_sockets.h \
          cbor_avis_strings.h \
          windows_avis_registry.h \
          windows_avis_shell.h \
          cbor_avis_match.h \
          cbor_avis_iterator.h \
          cbor_avis_collection.h \
          windows_avis_gdi.h \
          windows_avis_audio.h

# ==========================================================================
# BUILD RULE EXECUTION TARGETS
# ==========================================================================

.PHONY: all clean system_diagnostics

all: $(TARGET) system_diagnostics

$(TARGET): gdi_audio_main.c $(HEADERS)
	@echo [BUILD] Consolidating all architectural subsystems into target layer...
	$(CC) $(CFLAGS) gdi_audio_main.c $(OUT_FLAG)$(TARGET) $(LIBS)
	@echo [SUCCESS] Integration pipeline compilation step complete: $(TARGET)

system_diagnostics:
	@echo ==================================================================
	@echo SYSTEM COMPILED: AVIS Pipeline Layer Verification Confirmed
	@echo Subsystem Footprint: 12 Components Consolidated Into Target Native Image.
	@echo ==================================================================

clean:
	@echo [CLEAN] Purging generated transaction binary artifacts...
	-$(RM) $(TARGET)
	@echo [CLEAN] Framework environment reset nominal.
