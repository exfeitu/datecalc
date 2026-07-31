#!/usr/bin/env bash
# claude-loop.sh — scheduled Claude Code session runner
# Usage: ./scripts/claude-loop.sh
set -euo pipefail

PROJECT_DIR="/home/exfeitu/JustDoIt"
TODO_FILE="$PROJECT_DIR/docs/TODO-AUTO.md"
SESSION_LOG="$PROJECT_DIR/.claude-loop.log"
MAX_DURATION_MINUTES=25  # Stop before 30min to leave time for cleanup

cd "$PROJECT_DIR"

echo "[$(date -Iseconds)] Starting Claude Code session (max ${MAX_DURATION_MINUTES}min)" >> "$SESSION_LOG"

# Ensure TODO file exists
if [ ! -f "$TODO_FILE" ]; then
  echo "# TODO (Auto-generated)" > "$TODO_FILE"
  echo "" >> "$TODO_FILE"
fi

# Run Claude Code in headless mode with a timeout
# --print: non-interactive output
# --max-turns: safety limit
timeout ${MAX_DURATION_MINUTES}m claude --print \
  --max-turns 50 \
  "Read the current TODO list at docs/TODO-AUTO.md. Work on the top priority items.
   Rules:
   1. Read CLAUDE.md first for project conventions
   2. Work on TODO items in priority order
   3. When you're about to run out of time, update docs/TODO-AUTO.md:
      - Mark completed items as done
      - Add any new items discovered
      - Leave notes on in-progress items
   4. After updating TODO, run: git add -A && git commit -m 'auto: progress update' && git push
   5. If nothing to do, just update the TODO status and exit cleanly" \
  >> "$SESSION_LOG" 2>&1 || true

echo "[$(date -Iseconds)] Session ended" >> "$SESSION_LOG"
