<?php
/* ============================================================
   AVIS-ARTIFACT
   FILE: /Artifacts/export/compile_bundle.php
   PURPOSE: Compiles localized resource maps into an exportable 
            flat network configuration bundle.
   ============================================================ */

define('AVIS_CORE_SECURE', true);
require_once __DIR__ . '/../import/functions.php';

avis_logger("Initiating constellation bundle export process...", 'INFO');

$export_manifest_path = __DIR__ . '/manifest.json';
$output_bundle_path = __DIR__ . '/gateway.avis';

if (!file_exists($export_manifest_path)) {
    avis_logger("Export failure: Missing manifest.json base file", 'CRITICAL');
    exit(1);
}

$manifest_data = json_decode(file_get_contents($export_manifest_path), true);
if (!$manifest_data || !isset($manifest_data['assembler_blueprint']['pipelines'])) {
    avis_logger("Export failure: Invalid manifest.json schema structure", 'ERROR');
    exit(1);
}

// Open stream buffer to serialize configuration arrays into raw .avis block segments
$fp = fopen($output_bundle_path, 'w');
if (!$fp) {
    avis_logger("Export failure: Cannot create destination bundle path", 'CRITICAL');
    exit(1);
}

fwrite($fp, "begin.avis.gateway" . PHP_EOL);
fwrite($fp, "    version.\"2.0\"" . PHP_EOL);
fwrite($fp, "    entry.\"" . $manifest_data['assembler_blueprint']['target_manager_url'] . "?index=" . $manifest_data['assembler_blueprint']['index_pointer'] . "\"" . PHP_EOL);

foreach ($manifest_data['assembler_blueprint']['pipelines'] as $index => $node) {
    $repo_name = $node['repo_name'];
    $file_path = $node['live_file_path'];
    $role = $node['validation_role'];
    
    // Build canonical URI references matching host platform layout
    $root_uri = "https://github.com";
    $io_link_uri = $manifest_data['assembler_blueprint']['target_manager_url'] . "?index=" . str_replace('_AVIS', '', $role);

    fwrite($fp, PHP_EOL . "    # AVIS: node_{$index} | repo=\"{$repo_name}\" | role=\"{$role}\"" . PHP_EOL);
    fwrite($fp, "    repo.root.\"{$root_uri}\"" . PHP_EOL);
    fwrite($fp, "    repo.name.\"{$repo_name}\"" . PHP_EOL);
    fwrite($fp, "    repo.io_link.\"{$io_link_uri}\"" . PHP_EOL);
    fwrite($fp, "    ---" . PHP_EOL);
}

fwrite($fp, PHP_EOL . "    robot.export.\"constellation.bundle\"" . PHP_EOL);
fwrite($fp, "end.avis.gateway" . PHP_EOL);
fclose($fp);

avis_logger("Export complete: Constellation bundle successfully compiled to " . $output_bundle_path, 'INFO');
echo "[+] Bundle compiled smoothly into gateway.avis" . PHP_EOL;
