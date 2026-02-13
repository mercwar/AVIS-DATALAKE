name: FIREGEM_V4_PRIMARY_IGNITION
on: [push, workflow_dispatch]

jobs:
  ignition:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: System Entry
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Spark Hardware
        run: |
          sudo apt-get update && sudo apt-get install -y nasm jq
          # Build the Single Master Engine in the local dir
          nasm -f elf64 engine/manifest.asm -o manifest.o
          ld manifest.o -o engine/manifest
          chmod +x engine/manifest
          # Ignite the Binary using the local path
          ./engine/manifest kb.bin

      - name: Physical Grounding
        run: |
          git config --local user.email "cvbgod@demonizer.com"
          git config --local user.name "CVBGOD"
          git add .
          git commit -m "FIREGEM: Surface Manifested" || exit 0
          git push origin HEAD:main
