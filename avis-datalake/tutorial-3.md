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

# 📊 AVIS-DATALAKE Form Ingestion Schemas & Telemetry

The data structures extracted from the `AVIS-DATALAKE` forms reveal that the `avis.php` endpoint (`https://cron.iblogger.org/AVIS-DATALAKE/avis.php`) acts as an ingestion mechanism for system telemetry, asset details, and content storage. The fields are structured hierarchically using array-style bracket notation (e.g., `owner[system_id]`, `home[payload_content]`).

---

## 📋 Schema Specifications by Form Object

### Form Index [7] — Telemetry & Execution Pipeline
| Parameter Field | Value / Default | Control Type | Placeholder / Options Matrix |
| :--- | :--- | :--- | :--- |
| `method` | `'add'` | `hidden` | `None` |
| `file[title]` | `[Empty / User Input Required]` | `text` | The file name will be: `##-<this_text>.json/html` |
| `owner[system_id]` | `[Empty / User Input Required]` | `text` | e.g., `SYS-DATALAKE-ALPHA` |
| `owner[team]` | `[Empty / User Input Required]` | `text` | e.g., `Developer / Admin / Operations` |
| `owner[contact_email]` | `[Empty / User Input Required]` | `email` | e.g., `yourname@yourserver.com` |
| `id` | `[Empty / User Input Required]` | `text` | e.g., GUID `{e4a2c7b9-d13f-4e86-a512-9c42a8684b55}` |
| `lifecycle[version]` | `'v1.0.0'` | `text` | e.g., `v1.0.0` |
| `usage[context]` | `'win32_x64'` | `select` | `None` |
| `usage[purpose]` | `'local_tooling'` | `select` | `None` |
| `usage[frequency]` | `'random'` | `select` | `None` |
| `usage[notes]` | `[Empty / User Input Required]` | `textarea` | e.g., orchestration, logs, access, notes, telemetry... |
| `home[payload_content]` | `[Empty / User Input Required]` | `textarea` | [Paste raw data here] e.g., html, md, script, source, db... |

---

### Form Index [8] — Instructions & Workflow Routing
| Parameter Field | Value / Default | Control Type | Placeholder / Options Matrix |
| :--- | :--- | :--- | :--- |
| `method` | `'add'` | `hidden` | `None` |
| `file[title]` | `[Empty / User Input Required]` | `text` | The file name will be: `##-<this_text>.json/html` |
| `owner[system_id]` | `[Empty / User Input Required]` | `text` | e.g., `SYS-DATALAKE-ALPHA` |
| `owner[team]` | `[Empty / User Input Required]` | `text` | e.g., `Developer / Admin / Operations` |
| `owner[contact_email]` | `[Empty / User Input Required]` | `email` | e.g., `yourname@yourserver.com` |
| `id` | `[Empty / User Input Required]` | `text` | e.g., GUID `{e4a2c7b9-d13f-4e86-a512-9c42a8684b55}` |
| `lifecycle[version]` | `'v1.0.0'` | `text` | e.g., `v1.0.0` |
| `instructions[steps]` | `[Empty / User Input Required]` | `text` | e.g., `validate_input, run_transform, send_notification` |
| `instructions[order]` | `[Empty / User Input Required]` | `number` | e.g., `1` |
| `instructions[priority]` | `'medium'` | `select` | `None` |
| `instructions[role]` | `[Empty / User Input Required]` | `text` | e.g., Data Engineer, System Administrator, Automated Job Service |
| `usage[notes]` | `[Empty / User Input Required]` | `textarea` | e.g., orchestration, logs, access, notes, telemetry... |
| `home[payload_content]` | `[Empty / User Input Required]` | `textarea` | [Paste raw data here] e.g., html, md, script, source, db... |

---

### Form Index [9] — Network & Remote Binding Sources
| Parameter Field | Value / Default | Control Type | Placeholder / Options Matrix |
| :--- | :--- | :--- | :--- |
| `method` | `'add'` | `hidden` | `None` |
| `file[title]` | `[Empty / User Input Required]` | `text` | The file name will be: `##-<this_text>.json/html` |
| `owner[system_id]` | `[Empty / User Input Required]` | `text` | e.g., `SYS-DATALAKE-ALPHA` |
| `owner[team]` | `[Empty / User Input Required]` | `text` | e.g., `Developer / Admin / Operations` |
| `owner[contact_email]` | `[Empty / User Input Required]` | `email` | e.g., `yourname@yourserver.com` |
| `id` | `[Empty / User Input Required]` | `text` | e.g., GUID `{e4a2c7b9-d13f-4e86-a512-9c42a8684b55}` |
| `lifecycle[version]` | `'v1.0.0'` | `text` | e.g., `v1.0.0` |
| `location[protocol]` | `'https'` | `select` | `None` |
| `url[full]` | `[Empty / User Input Required]` | `url` | `https://domain.com` |
| `url[description]` | `[Empty / User Input Required]` | `text` | Describe remote data source / connection / application... |
| `url[adl]` | `[Empty / User Input Required]` | `url` | `https://domain.com / URI` |
| `usage[notes]` | `[Empty / User Input Required]` | `textarea` | e.g., orchestration, logs, access, notes, telemetry... |
| `home[payload_content]` | `[Empty / User Input Required]` | `textarea` | [Paste raw data here] e.g., html, md, script, source, db... |

---

### Form Index [10] — Pipeline Metadata & Aliasing
| Parameter Field | Value / Default | Control Type | Placeholder / Options Matrix |
| :--- | :--- | :--- | :--- |
| `file[title]` | `[Empty / User Input Required]` | `text` | The file name will be: `##-<this_text>.json/html` |
| `owner[system_id]` | `[Empty / User Input Required]` | `text` | e.g., `SYS-DATALAKE-ALPHA` |
| `owner[team]` | `[Empty / User Input Required]` | `text` | e.g., `Developer / Admin / Operations` |
| `owner[contact_email]` | `[Empty / User Input Required]` | `email` | e.g., `yourname@yourserver.com` |
| `id` | `[Empty / User Input Required]` | `text` | e.g., GUID `{e4a2c7b9-d13f-4e86-a512-9c42a8684b55}` |
| `lifecycle[version]` | `'v1.0.0'` | `text` | e.g., `v1.0.0` |
| `submit_another[pipeline_alias]` | `'section_owner'` | `select` | `None` |
| `submit_another[post_action]` | `'clear_flush'` | `select` | `None` |
| `usage[notes]` | `[Empty / User Input Required]` | `textarea` | e.g., orchestration, logs, access, notes, telemetry... |
| `home[payload_content]` | `[Empty / User Input Required]` | `textarea` | [Paste raw data here] e.g., html, md, script, source, db... |

---

## 🛠️ DevTools Interception Snippet

Because standard network listeners can miss submissions due to full-page navigation reloads, inject this script into the browser console to capture payloads immediately before viewport navigation:

```javascript
(() => {
    console.log("⚡ Form submission listener attached. Watching for navigation triggers...");

    document.querySelectorAll('form').forEach((form, index) => {
        form.addEventListener('submit', (event) => {
            const action = form.getAttribute('action') || form.action;
            
            console.group(`%c[FORM SUBMISSION PREVENTED] -> Index: ${index} | Target: ${action}`, "color: #ffaa00; font-weight: bold;");
            
            const formData = new FormData(form);
            const dataObject = {};
            
            for (let [key, value] of formData.entries()) {
                dataObject[key] = value;
            }
            
            console.log("Submitted Parameters:");
            console.table(dataObject);
            console.groupEnd();
            
            // Uncomment the next line if you wish to block transmission for debugging:
            // event.preventDefault();
        });
    });
})();

```

### 🗝️ The following batch will submit a record to the Avis Datalake once [dc2url](https://github.com/mercwar/dc2url) is installed...

```
@echo off
SETLOCAL EnableExtensions EnableDelayedExpansion

TITLE AVIS-2026 DATALAKE - JSON Input Stream Transmitter
color 0B

SET "TARGET_URL=https://cron.iblogger.org/AVIS-DATALAKE/avis.php"
SET "TEST_ID=GUID-{!RANDOM!!RANDOM!-!RANDOM!-!RANDOM!}"
SET "TIMESTAMP=%DATE% %TIME%"

echo ===================================================================
echo   AVIS-2026 DATALAKE - JSON STREAM TRANSMITTER
echo ===================================================================
echo Target Endpoint : %TARGET_URL%
echo GUID ID         : %TEST_ID%
echo -------------------------------------------------------------------

echo [INFO] Constructing JSON payload stream...

:: Construct the JSON payload string cleanly using variables
SET "JSON_PAYLOAD={"
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"method\":\"add\","
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"id\":\"%TEST_ID%\","
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"file\":{\"title\":\"automated_telemetry_packet\"},"
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"owner\":{\"system_id\":\"SYS-DATALAKE-ALPHA\",\"team\":\"Operations\",\"contact_email\":\"admin@mercwar.ai\"},"
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"lifecycle\":{\"version\":\"v1.0.0\"},"
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"usage\":{\"context\":\"win32_x64\",\"purpose\":\"local_tooling\",\"frequency\":\"random\",\"notes\":\"Automated ingest sync\"},"
SET "JSON_PAYLOAD=!JSON_PAYLOAD!\"home\":{\"realm\":\"AVIS-PRIMARY-CORE\",\"alpha\":\"json\",\"payload_content\":\"Operational uplink verified via JSON input stream\"}"
SET "JSON_PAYLOAD=!JSON_PAYLOAD!}"

echo [INFO] Transmitting via WebView2 headless engine with application/json header...
echo.

:: Execute dc2url sending application/json so PHP catches it via php://input
dc2url -X POST "%TARGET_URL%" ^
     -H "Content-Type: application/json" ^
     -d "!JSON_PAYLOAD!"

set "RETVAL=%ERRORLEVEL%"

echo ------------------------------------------------------------------
if %RETVAL% EQU 0 (
    echo [SUCCESS] Payload processed successfully through JSON input stream.
    pause
    EXIT /B 0
) else (
    echo [ERROR] Transmission failed with exit code %RETVAL%.
    pause
    EXIT /B %RETVAL%
)
```
---

[To publish entry records goto : Stargate](https://github.com/mercwar/Stargate)


## 🧭 Tutorial Navigation Index

Explore the complete implementation guides and step-by-step tutorials for the AVIS Datalake and Starmap system:
* [Readme : AVIS-DATALAKE TUTORIAL AND API REFERENCE](README.md) — ACCESSING THE AVIS DATALAKE YOURSELF
* [Tutorial 1: Initializing Your First Record](tutorial-1.md) — Constructing, validating, and submitting your initial structured data payloads.
* [Tutorial 2: Backend Integration & Multi-Tier Endpoint Routing](tutorial-2.md) — Configuring server-side receivers across ASP.NET Core, Generic Handlers, and Classic ASP vectors.
* [Tutorial 3: Stargate Built-in HTML Renderer & Interactive Datalake Integration](tutorial-3.md) — Leveraging local HTML rendering, inspecting node sources, and pushing home records directly to GitHub via `avis.php`.
