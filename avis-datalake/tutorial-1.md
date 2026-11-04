# AVIS-2026 Telemetry Datalake & Starmap Integration Engine

Welcome to the official technical specification and operational repository for the **AVIS Telemetry Datalake and Starmap System**. This ecosystem provides a deterministic, schema-driven ingestion pipeline, spatial coordinate mapping, and multi-tier endpoint routing designed to ingest structured telemetry, coordinate matrices, and node operational logs across modern and legacy web application frameworks.

---

## 📂 System Architecture Overview

The AVIS architecture is built around **13 core namespaces** that normalize inbound records into structured, queryable data lake artifacts. Whether processing asynchronous programmatic JSON payloads or legacy form-encoded vector streams, every transaction maintains strict structural integrity.

### Core Endpoints & Framework Profiles

| Deployment Tier | Endpoint Route | Accepted Content-Type | Processing Engine |
| --- | --- | --- | --- |
| **ASP.NET Core Web API** | `/api/avis` | `application/json` | Native Model Binding (`[FromBody]`) |
| **ASP.NET Generic Handler** | `/avis.ashx` | `application/x-www-form-urlencoded` | `HttpContext.Current.Request.Form` |
| **ASP.NET Web Forms** | `/uplink.aspx` | `multipart/form-data` | `Page.Request.Form` Array Streams |
| **Classic ASP Engine** | `/avis.asp` | `application/x-www-form-urlencoded` | Legacy `Request.Form("key")` Vector |

---

## 🗂️ The 13 Core Namespaces

1. **Root Level Variables**: Manages primary tracking headers (`id`) and state operational routing (`method`, baseline: `add`).
2. **`file` Namespace**: Handles target document naming and file sequencing (`file[title]`).
3. **`owner` Namespace**: Tracks system operator identities, team credentials, notification endpoints, and network domains (`loopback_local`, `virtual_bridge`, `github_net`).
4. **`lifecycle` Namespace**: Enforces versioning, iteration sequences, and staging parameters (`v1.0.0`).
5. **`home` Namespace**: Defines infrastructure context, realm partitions, host node signatures, and runtime ecosystems.
6. **`usage` Namespace**: Orchestrates processing context, intended purpose, and execution frequency rules.
7. **`location` Namespace**: Maps physical target storage, absolute directory paths, bus interfaces, and file system parameters (`nvme_ssd`, `ntfs`, cluster sizing).
8. **`format_spec` Namespace**: Governs data types, character encodings (`utf-8`), compression protocols, and MIME specifications.
9. **`governance` Namespace**: Controls repository types, compilation matrices, and system audit policies.
10. **`lineage` Namespace**: Tracks upstream source dependencies, processing tiers, and pipeline target propagation.
11. **`instructions` Namespace**: Manages programmatic step execution ordering, task priority, and assigned operators.
12. **`routing_tier` Namespace**: Specifies target distribution platforms and automated pipeline actions.
13. **Starmap Telemetry Extension**: Binds spatial coordinate matrices and node vector linkages directly to the data lake for 3D visualization renderers (e.g., Three.js Constellation layers).

---

---

# tutorial-1.md — Initializing Your First Ingress Payload

This tutorial walks through constructing, validating, and transmitting a compliant telemetry ingress payload into the AVIS data lake pipeline.

## Step 1: Constructing the Root Identifiers

Every valid transaction must declare a unique global transaction identifier and an operational routing method.

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "method": "add"
}

```

## Step 2: Populating Essential Namespaces

Attach the operational owner and home infrastructure metadata to classify the transmitting node and target environment.

```json
{
  "owner": {
    "system_id": "SYS-NODE-ALPHA-09",
    "team": "Infrastructure-Operations",
    "network_domain": "loopback_local",
    "protocol": "tcp_ip"
  },
  "home": {
    "realm": "AVIS-PRIMARY-CORE",
    "host_node": "JOE-TRON-DT",
    "stream_class": "adl_development_avis",
    "runtime_ecosystem": "web-personal-profile"
  }
}

```

## Step 3: Defining Physical Storage & Starmap Coordinates

Configure the target location and format specifications for writing the ingested stream into the datalake repository.

```json
{
  "location": {
    "dir_path": "C:\\MercwarAI\\AVIS-DATALAKE\\starmap\\",
    "file_name": "node_vector_01.dat",
    "storage_type": "nvme_ssd",
    "file_system": "ntfs"
  },
  "format_spec": {
    "data_type": "c-cpp",
    "encoding": "utf-8",
    "compression": "none"
  }
}

```

## Step 4: Transmitting via cURL

Post the complete structured payload to the target REST endpoint (`/api/avis`):

```bash
curl -X POST "https://mercwar01.byethost3.com/api/avis" \
     -H "Content-Type: application/json" \
     -d '{
       "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
       "method": "add",
       "owner": {
         "system_id": "SYS-NODE-ALPHA-09",
         "network_domain": "loopback_local"
       },
       "home": {
         "realm": "AVIS-PRIMARY-CORE",
         "host_node": "JOE-TRON-DT"
       },
       "location": {
         "dir_path": "C:\\MercwarAI\\AVIS-DATALAKE\\",
         "file_name": "telemetry_manifest.json"
       }
     }'

```

---

---

# AVIS API Reference & Ingestion Guide

## Complete Master JSON Payload Blueprint

For backend model validation and automated testing suites, the fully nested master payload structure appears below:

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "method": "add",
  "file": {
    "title": "Telemetry_Ingress_Document_01"
  },
  "owner": {
    "system_id": "SYS-NODE-ALPHA-09",
    "team": "Infrastructure-Operations",
    "contact_email": "ops-admin@internal.net",
    "network_domain": "loopback_local",
    "node_address": "127.0.0.1",
    "protocol": "tcp_ip"
  },
  "lifecycle": {
    "version": "v1.0.0",
    "stage": "active"
  },
  "home": {
    "realm": "AVIS-PRIMARY-CORE",
    "host_node": "JOE-TRON-DT",
    "stream_class": "adl_development_avis",
    "runtime_ecosystem": "web-personal-profile",
    "alpha": "html",
    "payload_content": "Raw buffer stream data..."
  },
  "usage": {
    "notes": "System tracking log entry.",
    "context": "win32_x64",
    "purpose": "local_tooling",
    "frequency": "random"
  },
  "location": {
    "dir_path": "C:\\MercwarAI\\AVIS-DATALAKE\\",
    "file_name": "ingress_payload.json",
    "drive_letter": "C",
    "storage_type": "nvme_ssd",
    "bus_interface": "pcie_nvme",
    "file_system": "ntfs",
    "cluster_size": "4096",
    "local_backup_policy": "single_instance",
    "protocol": "https"
  },
  "format_spec": {
    "data_type": "c-cpp",
    "encoding": "utf-8",
    "schema_version": "v1.0.0",
    "compression": "none",
    "file_size": "4096"
  },
  "governance": {
    "repo_type": "git",
    "compilation_matrix": "MSVC-UCRT64",
    "audit_policy": "strict"
  },
  "lineage": {
    "upstream_sources": "AVIS-CORE",
    "processing_tier": "ingress-layer-1",
    "pipeline_id": "PIPE-99X",
    "downstream_targets": "Starmap-Renderer"
  },
  "instructions": {
    "steps": "1. Ingest -> 2. Validate -> 3. Route -> 4. Render",
    "priority": "high",
    "assigned_operator": "CVBGOD"
  },
  "routing_tier": {
    "target_platform": "Win32-Web",
    "automation_action": "sync"
  }
}

```

---

Provide your specifications or instructions for the final page whenever you are ready.
