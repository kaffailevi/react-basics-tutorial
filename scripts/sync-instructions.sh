#!/bin/sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
SOURCE_FILE="$ROOT_DIR/CLAUDE.md"
TARGET_FILE="$ROOT_DIR/.github/copilot-instructions.md"
TEMP_FILE=$(mktemp)

cleanup() {
  rm -f "$TEMP_FILE"
}

trap cleanup EXIT INT HUP TERM

if [ ! -f "$SOURCE_FILE" ]; then
  printf '%s\n' "Missing source file: $SOURCE_FILE" >&2
  exit 1
fi

if [ ! -d "$ROOT_DIR/.github" ]; then
  mkdir -p "$ROOT_DIR/.github"
fi

{
  printf '%s\n' '# Copilot Instructions'
  tail -n +2 "$SOURCE_FILE"
} > "$TEMP_FILE"

mv "$TEMP_FILE" "$TARGET_FILE"

printf '%s\n' "Synced $TARGET_FILE from $SOURCE_FILE"