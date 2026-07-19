/**
 * @file windows_avis_audio.h
 * @brief Win32 Waveform Audio Output Wrapper Layer with AVIS Validation
 * @note Encapsulates winmm WaveOut functions to generate sound pulses synchronously with GDI updates.
 */

#ifndef WINDOWS_AVIS_AUDIO_H
#define WINDOWS_AVIS_AUDIO_H

#include <windows.h>
#include <mmsystem.h>
#include <stdio.h>
#include <stdbool.h>
#include <math.h>

// Link the Windows Multimedia library explicitly if compiling with MSVC
#pragma comment(lib, "winmm.lib")

#define AUDIO_SAMPLE_RATE 44100
#define PI_CONSTANT 3.14159265358979323846

/* ==========================================================================
 * WIN32 AUDIO SYSTEM WRAPPERS
 * ========================================================================== */

/**
 * @brief Wrapper around MessageBeep to issue quick, standard hardware notification alerts.
 */
void win_avis_audio_beep_system(UINT alert_type) {
    // Standard types: MB_ICONERROR (fault), MB_ICONINFORMATION (success), etc.
    if (!MessageBeep(alert_type)) {
        fprintf(stderr, "[AVIS_AUDIO_WARNING] Hardware system beep failed to execute.\n");
    }
}

/**
 * @brief High-reliability wrapper around waveOutOpen to initialize local speaker channels.
 */
HWAVEOUT win_avis_audio_open_device(void) {
    HWAVEOUT h_wave_out = NULL;
    WAVEFORMATEX wave_format;

    // Define standard PCM 16-bit Mono audio formatting configurations
    wave_format.wFormatTag = WAVE_FORMAT_PCM;
    wave_format.nChannels = 1;
    wave_format.nSamplesPerSec = AUDIO_SAMPLE_RATE;
    wave_format.wBitsPerSample = 16;
    wave_format.nBlockAlign = (wave_format.nChannels * wave_format.wBitsPerSample) / 8;
    wave_format.nAvgBytesPerSec = wave_format.nSamplesPerSec * wave_format.nBlockAlign;
    wave_format.cbSize = 0;

    MMRESULT result = waveOutOpen(&h_wave_out, WAVE_MAPPER, &wave_format, 0, 0, CALLBACK_NULL);
    if (result != MMSYSERR_NOERROR) {
        fprintf(stderr, "[AVIS_AUDIO_ERROR] Failed to open standard audio output device. MMRESULT: %d\n", result);
        ExitProcess(EXIT_FAILURE);
    }
    return h_wave_out;
}

/**
 * @brief Generates and queues a raw mathematical sine-wave sound block directly on the hardware track.
 */
void win_avis_audio_play_tone(HWAVEOUT h_wave_out, double frequency_hz, int duration_ms) {
    if (h_wave_out == NULL) return;

    size_t total_samples = (AUDIO_SAMPLE_RATE * duration_ms) / 1000;
    size_t buffer_bytes = total_samples * sizeof(short);

    // Allocate continuous page blocks for raw sound arrays
    short *raw_pcm_buffer = (short*)malloc(buffer_bytes);
    if (raw_pcm_buffer == NULL) {
        fprintf(stderr, "[AVIS_AUDIO_ERROR] Memory allocation failure for audio synth buffer.\n");
        return;
    }

    // Synthesize target sine frequency pattern waves into raw array bytes
    for (size_t i = 0; i < total_samples; i++) {
        double time_sec = (double)i / AUDIO_SAMPLE_RATE;
        raw_pcm_buffer[i] = (short)(32760.0 * sin(2.0 * PI_CONSTANT * frequency_hz * time_sec));
    }

    // Initialize tracking structures required by waveOut subsystem API
    WAVEHDR wave_header = {0};
    wave_header.lpData = (LPSTR)raw_pcm_buffer;
    wave_header.dwBufferLength = (DWORD)buffer_bytes;

    // Prepare header block structures for hardware ingestion
    if (waveOutPrepareHeader(h_wave_out, &wave_header, sizeof(WAVEHDR)) == MMSYSERR_NOERROR) {
        waveOutWrite(h_wave_out, &wave_header, sizeof(WAVEHDR));

        // Block execution context synchronously until track completion
        while (!(wave_header.dwFlags & WHDR_DONE)) {
            Sleep(10);
        }

        waveOutUnprepareHeader(h_wave_out, &wave_header, sizeof(WAVEHDR));
    } else {
        fprintf(stderr, "[AVIS_AUDIO_ERROR] waveOutPrepareHeader transaction failed.\n");
    }

    free(raw_pcm_buffer);
}

/**
 * @brief Safely shuts down the audio track line and reclaims driver handles.
 */
void win_avis_audio_close_device(HWAVEOUT h_wave_out) {
    if (h_wave_out != NULL) {
        waveOutReset(h_wave_out);
        if (waveOutClose(h_wave_out) != MMSYSERR_NOERROR) {
            fprintf(stderr, "[AVIS_AUDIO_ERROR] Failed to properly finalize and close audio handle.\n");
        }
    }
}

#endif /* WINDOWS_AVIS_AUDIO_H */
