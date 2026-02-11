<?php
// [AVIS_LOG_RECEIVER]
$data = json_decode(file_get_contents('php://input'), true);

if ($data && $data['event'] === 'VB6_COMPILE_RESULT') {
    $log_entry = sprintf(
        "[%s] STATUS: %s | LOG: %s\n",
        $data['timestamp'],
        $data['status'],
        $data['log_tail']
    );
    // Write to a pulse log that your index.php reads
    file_put_contents('nexus_pulse.log', $log_entry, FILE_APPEND);
}
?>
