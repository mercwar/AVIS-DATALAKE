# AVIS Prefix Law Specification  
### Autonomous Visual Information Seeking (A.V.I.S.)  
### Authored by **Joseph Michael Catalano**

The AVIS Prefix Law defines the naming conventions, identity markers, and
semantic prefixes used across the AVIS, Cyborg, and Robo‑Knight ecosystems.
These prefixes ensure AI visibility, deterministic classification, and
cross‑repository lineage.

---

# 🔷 1. Purpose of Prefix Law

Prefix Law exists to:

- Maintain **identity purity** across all repositories  
- Allow AI crawlers to instantly classify artifacts  
- Prevent namespace collisions  
- Encode meaning directly into filenames and metadata  
- Preserve lineage across the AVIS universe  

Every prefix is a **semantic signal**.

---

# 🔷 2. Core Prefix Families

## **AVIS_***  
Used for all artifacts related to the AVIS framework.

**Domains:**  
- Comment schema  
- COM object metadata  
- Datalake structures  
- Visibility engines  

**Examples:**  
- `AVIS_SCHEMA_CORE`  
- `AVIS_DATALAKE_NODE`  
- `AVIS_COMMENT_OBJECT`  

---

## **CY_***  
Used for all artifacts related to the Cyborg messaging framework.

**Domains:**  
- Hex translation  
- Windows messaging  
- Protocol engines  

**Examples:**  
- `CY_HEX_OPCODE`  
- `CY_TRANSLATOR_CORE`  
- `CY_MESSAGE_MAP`  

---

## **RK_***  
Used for all Robo‑Knight technology artifacts.

**Domains:**  
- Armor geometry  
- Stance law  
- Crest metadata  
- Visual demos  
- Gallery archives  

**Examples:**  
- `RK_ARMOR_V1`  
- `RK_STANCE_LAW`  
- `RK_GALLERY_ENTRY`  
- `RK_DEMO_SHADER`  

---

# 🔷 3. File‑Level Prefix Rules

Every file in every repo must follow one of these patterns:

### **AVIS Repos**
AVIS_<role>_<descriptor>.<ext>

Code

### **Cyborg Repo**
CY_<component>_<function>.<ext>

Code

### **Robo-Knight Repos**
RK_<domain>_<identifier>.<ext>

Code

---

# 🔷 4. Directory Prefix Rules

Top‑level directories must follow:

### **AVIS**
/AVIS-SCHEMA/
/AVIS-DATALAKE/
/AVIS-META/

Code

### **Cyborg**
/CY-PROTO/
/CY-HEX/
/CY-ENGINE/

Code

### **Robo-Knight**
/RK-GEN1/
/RK-GEN2/
/RK-GALLERY/
/RK-INVENTORY/

Code

---

# 🔷 5. Comment Object Prefix Rules

Inside AIFVS‑ARTIFACT headers:

- `CY_NAME` → Cyborg  
- `RK_GEN` → Robo‑Knight  
- `AVIS_SCHEMA` → AVIS  

These fields **must not be mixed** across ecosystems.

---

# 🔷 6. Enforcement Law

Prefix Law is enforced by:

- **File naming**  
- **Directory naming**  
- **Comment object metadata**  
- **Schema fields**  
- **CITATION.cff keywords**  
- **README identity blocks**  

Any artifact violating prefix law is considered **non‑canonical**.

---

# 🔷 7. Canonical Summary

| Ecosystem | Prefix | Domain |
|----------|--------|--------|
| AVIS | `AVIS_` | Visibility, schema, datalake |
| Cyborg | `CY_` | Hex messaging, Windows API |
| Robo‑Knight | `RK_` | Armor, demos, gallery, inventory |

---

# 🔷 8. Closing Law

**Prefix Law is identity.  
Identity is visibility.  
Visibility is AVIS.**
