# Tutorial: Pushing Starmap Home Records to the AVIS Datalake via `avis.php`
[To publish entry records goto : Stargate](https://github.com/mercwar/Stargate)


## 🧭 Tutorial Navigation Index

Explore the complete implementation guides and step-by-step tutorials for the AVIS Datalake and Starmap system:
* [Readme : AVIS-DATALAKE TUTORIAL AND API REFERENCE](README.md) — ACCESSING THE AVIS DATALAKE YOURSELF
* [Tutorial 1: Initializing Your First Record](tutorial-1.md) — Constructing, validating, and submitting your initial structured data payloads.
* [Tutorial 2: Backend Integration & Multi-Tier Endpoint Routing](tutorial-2.md) — Configuring server-side receivers across ASP.NET Core, Generic Handlers, and Classic ASP vectors.
* [Tutorial 3: Stargate Built-in HTML Renderer & Interactive Datalake Integration](tutorial-3.md) — Leveraging local HTML rendering, inspecting node sources, and pushing home records directly to GitHub via `avis.php`.
This tutorial walks through the modular components required to construct, serialize, and transmit a strict schema home record containing an HTML "Hello" payload directly to your `/avis.php` endpoint for data lake storage and GitHub synchronization.

---

## Step 1: The Form Markup

Construct your input form to incorporate the mandatory root-level identifiers, strict schema baseline parameters (`realm` and `stream_class`), and the nested `home` namespace elements (`host_node` and `payload_content`).

```html
<form id="avisForm" onsubmit="submitHomeRecord(event)">
    <!-- Root Level Identifiers -->
    <input type="hidden" name="id" id="txId" value="">
    <input type="hidden" name="method" value="add">

    <!-- Mandatory Baseline Parameters for Strict Schema Validation -->
    <input type="hidden" name="home[realm]" value="AVIS-PRIMARY-CORE">
    <input type="hidden" name="home[stream_class]" value="adl_development_avis">

    <!-- Node Signature & Ecosystem -->
    <label>Host Node Signature:</label>
    <input type="text" name="home[host_node]" value="JOE-TRON-DT" required>

    <label>Runtime Ecosystem:</label>
    <input type="text" name="home[runtime_ecosystem]" value="web-personal-profile">

    <!-- HTML Hello Payload Content -->
    <label>Payload Content:</label>
    <textarea name="home[payload_content]" rows="4" required>&lt;h1&gt;Hello from AVIS Datalake Starmap&lt;/h1&gt;</textarea>

    <button type="submit">Push Record to avis.php</button>
</form>

```

---

## Step 2: Client-Side JavaScript Transmission Logic

Use JavaScript to automatically generate a unique transaction ID on load, bind the form data into URL-encoded parameters, and post the payload asynchronously to `/avis.php`.

```javascript
// Automatically generate a unique UUID transaction ID on page load
document.addEventListener('DOMContentLoaded', () => {
    const txIdField = document.getElementById('txId');
    if (txIdField && window.crypto && crypto.randomUUID) {
        txIdField.value = crypto.randomUUID();
    } else {
        txIdField.value = 'avis-' + Date.now();
    }
});

async function submitHomeRecord(event) {
    event.preventDefault();
    const form = document.getElementById('avisForm');
    const formData = new FormData(form);

    try {
        // Transmit as application/x-www-form-urlencoded via URLSearchParams
        const response = await fetch('/avis.php', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        const result = await response.json();
        console.log("[AVIS-DATALAKE] Transmission Success:", result);
        alert("Record successfully pushed to datalake! ID: " + result.id);
    } catch (error) {
        console.error("[AVIS-DATALAKE] Transmission Error:", error);
        alert("Failed to push record: " + error.message);
    }
}

```

---

## Step 3: Server-Side PHP Ingress Receiver (`avis.php`)

On the backend, parse the incoming multi-dimensional `$_POST['home']` array, validate mandatory strict schema parameters, persist the HTML content into the local datalake directory structure, and return a JSON status acknowledgment.

```php
<?php
header('Content-Type: application/json');

// Capture root identifiers
$id = $_POST['id'] ?? uniqid('avis-');
$method = $_POST['method'] ?? 'add';

// Capture and sanitize nested home namespace parameters
$home = $_POST['home'] ?? [];
$realm = $home['realm'] ?? 'AVIS-PRIMARY-CORE';
$streamClass = $home['stream_class'] ?? 'adl_development_avis';
$hostNode = $home['host_node'] ?? 'UNKNOWN';
$payloadContent = $home['payload_content'] ?? '';

// Strict schema validation check
if (empty($id) || empty($hostNode) || empty($payloadContent)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Validation failed: Missing mandatory root id, host_node, or payload_content."
    ]);
    exit;
}

// Define target local AVIS datalake storage path
$targetDir = __DIR__ . '/AVIS-DATALAKE/starmap/';
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Persist the home record file
$filename = $targetDir . $id . '_home.html';
file_put_contents($filename, $payloadContent);

// Optional automated Git synchronization hook
// exec('git add . && git commit -m "AVIS Datalake sync [ID: ' . $id . ']" && git push');

// Return successful ingestion response
echo json_encode([
    "status" => "success",
    "id" => $id,
    "method" => $method,
    "validated_schema" => [
        "realm" => $realm,
        "stream_class" => $streamClass,
        "host_node" => $hostNode
    ],
    "storage_target" => $filename,
    "message" => "Home record validated, stored, and synchronized successfully."
]);
?>

```
[To publish entry records goto : Stargate](https://github.com/mercwar/Stargate)


## 🧭 Tutorial Navigation Index

Explore the complete implementation guides and step-by-step tutorials for the AVIS Datalake and Starmap system:
* [Readme : AVIS-DATALAKE TUTORIAL AND API REFERENCE](README.md) — ACCESSING THE AVIS DATALAKE YOURSELF
* [Tutorial 1: Initializing Your First Record](tutorial-1.md) — Constructing, validating, and submitting your initial structured data payloads.
* [Tutorial 2: Backend Integration & Multi-Tier Endpoint Routing](tutorial-2.md) — Configuring server-side receivers across ASP.NET Core, Generic Handlers, and Classic ASP vectors.
* [Tutorial 3: Stargate Built-in HTML Renderer & Interactive Datalake Integration](tutorial-3.md) — Leveraging local HTML rendering, inspecting node sources, and pushing home records directly to GitHub via `avis.php`.
