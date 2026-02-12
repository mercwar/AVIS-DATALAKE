#!/bin/bash
# Location: /verify_pat.sh

echo "--- Diagnostic: MERC_G_PAT Properties ---"

# 1. Check if variable exists
if [ -z "$MERC_G_PAT" ]; then
    echo "Status: [FAILED] MERC_G_PAT is not set in this environment."
else
    echo "Status: [ACTIVE]"
    
    # 2. Echo character count (Property: Length)
    echo "Property: Length = ${#MERC_G_PAT} characters"
    
    # 3. Echo Prefix Check (Property: Format)
    # GitHub PATs usually start with 'ghp_'
    if [[ $MERC_G_PAT == ghp_* ]]; then
        echo "Property: Format = Valid GitHub PAT Prefix (ghp_)"
    else
        echo "Property: Format = Custom or non-standard format"
    fi

    # 4. Echo Visibility (Property: Export Status)
    if printenv | grep -q "MERC_G_PAT"; then
        echo "Property: Scope = Exported to environment"
    else
        echo "Property: Scope = Local shell variable only"
    fi
fi
echo "---------------------------------------"
