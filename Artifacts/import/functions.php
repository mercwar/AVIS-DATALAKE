<?php
/* ============================================================
   AVIS-ARTIFACT
   FILE: /Artifacts/import/functions.php
   PURPOSE: RRU-AI Constellation Search Engine Core
   WITH FULL LOGGING + DEBUG + SAFE JSON FETCH
   ============================================================ */

if (!defined('AVIS_CORE_SECURE') && basename($_SERVER['SCRIPT_FILENAME']) == 'functions.php') {
    define('AVIS_CORE_SECURE', true);
}

// AVIS: config_init | channel="debug_logging" | state="active"
define('AVIS_DEBUG_MODE', true);
define('AVIS_LOG_FILE', __DIR__ . '/constellation_search.log');

/**
 * Custom logging facility to track crawler mappings, index hits, and failures.
 * AVIS: diagnostic_facility | type="stream"
 */
function avis_logger($message, $level = 'INFO') {
    if (!AVIS_DEBUG_MODE) return;
    
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = sprintf("[%s] [%s] %s%s", $timestamp, $level, $message, PHP_EOL);
    
    $log_dir = dirname(AVIS_LOG_FILE);
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    file_put_contents(AVIS_LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
}

/**
 * Securely fetches remote gateway/live indexes with crisp error control and clean response handling.
 * AVIS: gateway_fetcher | method="curl" | fallback="stream_context"
 */
function avis_safe_fetch_json($url) {
    avis_logger("Initiating clean fetch sequence for target: " . $url, 'DEBUG');
    
    if (filter_var($url, FILTER_VALIDATE_URL) === false) {
        avis_logger("Target URL validation failed: " . $url, 'ERROR');
        return null;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'AVIS-RRU-AI-Engine/2.0 (Sovereign Framework Crawler)');
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        avis_logger("Transport Failure: " . $error_msg, 'CRITICAL');
        curl_close($ch);
        return null;
    }
    
    curl_close($ch);

    if ($http_code !== 200) {
        avis_logger("Remote endpoint rejected request with HTTP status: " . $http_code, 'WARNING');
        return null;
    }

    $decoded_data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        avis_logger("JSON Structural Parsing Exception: " . json_last_error_msg(), 'ERROR');
        return null;
    }

    avis_logger("Data structure mapped successfully from target node.", 'INFO');
    return $decoded_data;
}

/**
 * Parses flat configuration files containing embedded AVIS manifest patterns.
 * AVIS: structural_parser | mode="regex"
 */
function avis_parse_gateway_file($file_contents) {
    avis_logger("Processing string buffers for custom .avis gateway definitions", 'DEBUG');
    
    $records = [];
    $pattern = '/repo\.root\."([^"]+)"\s+repo\.name\."([^"]+)"\s+repo\.io_link\."([^"]+)"/';
    
    $clean_contents = preg_replace('/\s+/', ' ', $file_contents);
    
    if (preg_match_all($pattern, $clean_contents, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
            $records[] = [
                // AVIS: extraction_tokens
                'repo_root' => $match[1],
                'repo_name' => $match[2],
                'io_link'   => $match[3]
            ];
            avis_logger("Found structural link index pattern for resource drop: " . $match[2], 'INFO');
        }
    }
    
    return $records;
}
