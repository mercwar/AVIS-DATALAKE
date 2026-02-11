notify the gateway to refresh its cache.
bash
#!/bin/bash
# [AVIS_SITEMAP_GENERATOR]
# Run this in your GitHub Action to update the Gateway

GATEWAY_URL="https://your-cyborg-gateway.com"
OUTPUT="sitemap.xml"

echo "/* Building AVIS Sitemap Pathing */"

# Generate XML
echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org">' > $OUTPUT
echo "  <url><loc>https://mercwar.github.io</loc></url>" >> $OUTPUT

# Scrape the PHP Gateway to ensure it's alive and cached
STATUS=$(curl -o /dev/null -s -w "%{http_code}" $GATEWAY_URL)

if [ $STATUS -eq 200 ]; then
    echo "/* GATEWAY_SYNC_SUCCESS: $STATUS */"
else
    echo "/* GATEWAY_SYNC_ERROR: $STATUS */"
fi

echo "</urlset>" >> $OUTPUT
