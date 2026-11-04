Here is the complete, untruncated breakdown of the strictly unique fields belonging to each form module across your entire workspace, completely separated out from the common global keys (id, title, version, protocol, notes).

🏢 Identity & Ownership Forms


📂 1. FILE FORM

• No unique fields outside of global common keys. (This form relies entirely on file[title] to sequence files).

📂 2. OWNER FORM


Unique Parameter	ASP Data Type	Required	Available UI Matrix Elements / Behavior
owner[system_id]	String	Yes	Operator workspace target verification tag or user nickname.
owner[team]	String	No	Deployment crew or internal administrative group label.
owner[contact_email]	String (Email)	No	Notification callback target email address.
owner[network_domain]	String (Enum)	No	loopback_local, virtual_bridge, lan_intranet, github_net, gitlab_net, npm_registry
owner[node_address]	String	No	Network interface destination address or host computer string.


📡 Infrastructure Environment Forms


📂 3. HOME FORM


Unique Parameter	ASP Data Type	Required	Available UI Matrix Elements / Behavior
home[realm]	String	No	Target isolation workspace cluster layer. Baseline: AVIS-PRIMARY-CORE.
home[host_node]	String	Yes	Physical or virtual machine tracking code transmitting the block.
home[stream_class]	String (Enum)	No	adl_development_avis, adl_development_other, adl_development_personal, adl_core_onprem, adl_core_colocation
home[runtime_ecosystem]	String (Enum)	No	web-personal-profile, web-personal-blog, web-custom-style-override, web-personal-landing
home[alpha]	String (Enum)	No	Syntax processing engine configuration: html, md, js, css, txt
home[payload_content]	String (Long)	No	Raw configuration text block stream buffer mapping to the lake.


📂 4. USAGE FORM

Includes unique configuration fields for context (usage[context]), intended purpose (usage[purpose]), and execution frequency (usage[frequency]).

📂 Physical Infrastructure & Format Forms


📂 5. LOCATION FORM

Defines absolute paths, file names, storage hardware types, bus interfaces, and file system parameters (such as location[dir_path], location[file_name], and location[storage_type]).

📂 6. FORMAT_SPEC FORM

Governs data types, character encodings, compression methods, MIME types, and cryptographic hashes (format_spec[data_type], format_spec[encoding], etc.).

⚙️ Pipeline Control & Flow Governance Forms


📂 7. GOVERNANCE FORM

Contains repository types, compilation matrices, and audit policies (governance[repo_type], governance[compilation_matrix], governance[audit_policy]).

📂 8. LINEAGE FORM

Tracks upstream sources, processing tiers, pipeline identifiers, and downstream targets (lineage[upstream_sources], lineage[processing_tier], etc.).

📂 9. INSTRUCTIONS FORM

Manages programmatic steps, sequence ordering, priorities, and assigned operators (instructions[steps], instructions[priority], etc.).

📂 10. ROUTING_TIER FORM (Derived from 'Other' Panel)

Specifies target distribution platforms and automation actions (routing_tier[target_platform], routing_tier[automation_action]).

📂 11. LIFECYCLE FORM

• No unique fields outside of global common keys.

📥 Consolidated Master Payload Spec

For backend system models or payload tracking generation, all unique fields align into a nested object architecture. You can find the complete JSON payload structure and schema mapping in the reference documentation.
Would it help to convert this consolidated map into a C# Data Transfer Object (DTO) class model with JSON attributes for serialization testing?
