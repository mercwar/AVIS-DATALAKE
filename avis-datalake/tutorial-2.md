# tutorial-2.md — Backend Integration & Multi-Tier Endpoint Routing

This tutorial covers setting up server-side receivers across your multi-tier application stack to capture, parse, and persist incoming AVIS telemetry and Starmap coordinate payloads from `/api/avis`, `/avis.ashx`, `/uplink.aspx`, and `/avis.asp`.

---

## Step 1: ASP.NET Core Web API Ingress Controller (`/api/avis`)

For modern asynchronous programmatic pipelines sending `application/json`, implement a strongly-typed API controller using the master DTO model.

```csharp
using Microsoft.AspNetCore.Mvc;
using Avis.Datalake.Models;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

[ApiController]
[Route("api/avis")]
public class AvisIngressController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> IngestTelemetry([FromBody] AvisIngressPayload payload)
    {
        if (payload == null || string.IsNullOrEmpty(payload.Id))
        {
            return BadRequest(new { status = "error", message = "Invalid payload or missing mandatory transaction ID." });
        }

        // Ensure target datalake directory exists
        string targetDir = payload.Location?.DirPath ?? @"C:\MercwarAI\AVIS-DATALAKE\";
        Directory.CreateDirectory(targetDir);

        string fileName = $"{payload.Id}_{payload.Location?.FileName ?? "manifest.json"}";
        string fullPath = Path.Combine(targetDir, fileName);

        // Serialize and persist to local NVMe data lake layer
        string jsonOutput = JsonSerializer.Serialize(payload, new JsonSerializerOptions { WriteIndented = true });
        await System.IO.File.WriteAllTextAsync(fullPath, jsonOutput);

        return Ok(new { 
            status = "success", 
            transaction_id = payload.Id, 
            routed_endpoint = "/api/avis",
            storage_target = fullPath 
        });
    }
}

```

---

## Step 2: ASP.NET Generic Handler (`/avis.ashx`)

For traditional form-urlencoded transmissions, use an `IHttpHandler` to map form parameters directly into the namespace hierarchy.

```csharp
using System;
using System.Web;
using System.IO;

public class AvisHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "application/json";

        string transactionId = context.Request.Form["id"] ?? Guid.NewGuid().ToString();
        string method = context.Request.Form["method"] ?? "add";
        string hostNode = context.Request.Form["home[host_node]"] ?? "UNKNOWN-NODE";
        string dirPath = context.Request.Form["location[dir_path]"] ?? @"C:\MercwarAI\AVIS-DATALAKE\";

        try
        {
            Directory.CreateDirectory(dirPath);
            string logEntry = $"[{DateTime.UtcNow:O}] ID: {transactionId} | Method: {method} | Node: {hostNode}\n";
            File.AppendAllText(Path.Combine(dirPath, "handler_telemetry.log"), logEntry);

            context.Response.Write($"{{\"status\":\"success\",\"id\":\"{transactionId}\",\"method\":\"{method}\"}}");
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            context.Response.Write($"{{\"status\":\"error\",\"message\":\"{ex.Message}\"}}");
        }
    }

    public bool IsReusable => false;
}

```

---

## Step 3: Classic ASP Vector Receiver (`/avis.asp`)

For legacy infrastructure integration points, capture incoming form vectors using standard VBScripting.

```vbscript
<%
Response.ContentType = "application/json"

Dim txId, methodAction, hostNode, targetDir
txId = Request.Form("id")
methodAction = Request.Form("method")
hostNode = Request.Form("home[host_node]")
targetDir = Request.Form("location[dir_path]")

If Len(Trim(txId)) = 0 Then
    txId = "LEGACY-" & Year(Now) & Month(Now) & Day(Now) & "-" & Timer()
End If

If Len(Trim(methodAction)) = 0 Then
    methodAction = "add"
End If

' Response payload emission acknowledging ingestion
Response.Write("{ ""status"": ""success"", ""id"": """ & txId & """, ""method"": """ & methodAction & """, " & _
               """node"": """ & hostNode & """, ""tier"": ""classic_asp"" }")
%>

```
