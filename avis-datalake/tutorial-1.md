To capture the equivalent ingress architecture for handling tracking configurations on ASP / ASP.NET pages (e.g., avis.ashx, uplink.aspx, or a legacy avis.asp receiver), the parameters must be processed as part of a structured request matrix.
Below is the complete API specification formatted entirely into clean, scannable reference tables.

📡 1. Core Routing & Ingress Profiles


Deployment Type	Target Endpoint Route	Required HTTP Method	Accepted Content-Types
ASP.NET Core Web API	/api/avis	POST	application/json
ASP.NET Generic Handler	/avis.ashx	POST	application/x-www-form-urlencoded
ASP.NET Web Forms	/uplink.aspx	POST	multipart/form-data
Classic ASP Page	/avis.asp	POST	application/x-www-form-urlencoded


📂 2. Root Level Identification Matrix


Parameter Key	Data Type	Required	Processing Behavior & Framework Mapping
id	String (GUID)	Yes	Root telemetry transaction identifier. Retrieved via Request.Form["id"] or model binding.
method	String (Hidden)	No	Defines operational pipeline state routing block. Static mapping baseline value: add.

