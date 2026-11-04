Below is the upgraded API specification for the ASP/ASP.NET pages. By normalizing the common keys found across your data layers, the schema has been consolidated into unified, repeatable structures.

📡 1. Global Endpoints & Framework Profiles


Framework Layer	System Endpoint	Method	Accepted Content-Type	Core Data Ingestion Engine
ASP.NET Core Web API	/api/avis	POST	application/json	Native Model Binding ([FromBody])
ASP.NET Handler	/avis.ashx	POST	application/x-www-form-urlencoded	HttpContext.Current.Request.Form
ASP.NET Web Forms	/uplink.aspx	POST	multipart/form-data	Page.Request.Form Array Streams
Classic ASP Engine	/avis.asp	POST	application/x-www-form-urlencoded	Legacy Request.Form("key") Vector


🔑 2. Unified Base Metadata Structure (Global Common Keys)

These foundational elements are globally shared across almost every workflow pane to track unique telemetry identity, classification, and runtime status.

Normalized Key	Data Type	Required	Processing Behavior & Purpose
id	String (GUID)	Yes	Global Unique Identifier representing this specific telemetry tracking block transaction.
title	String (Text)	No	Human-readable manifest or tracking record name (e.g., Network_Core_Ingress_Manifest).
version	String (Text)	No	Pipeline template configuration version or code layout signature block. Baseline: v1.0.0.
protocol	String (Enum)	No	Core transmission protocol layer category. Shared across network contexts and storage paths.
notes	String (Textarea)	No	Open tracking narrative fields for appending system changelogs or manual comments.


📂 3. Upgraded Operational & Identity Namespaces

The remaining functional definitions span sections covering Infrastructure Context (owner, home, usage), Physical Target Storage (location, format_spec), and Workflow Execution Management (lifecycle, governance, lineage, instructions, routing_tier). These areas use the standardized core keys alongside their dedicated attributes to orchestrate metrics processing, layout format identification, and execution queues. For full detailed configuration fields across all downstream sections, please see the complete system profile documentation.
Would you like me to output a strongly-typed C# C-Sharp class model using these normalized keys, or do you need the full HTML tables layout for all downstream data nodes?
