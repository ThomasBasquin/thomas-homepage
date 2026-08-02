#!/usr/bin/env bash
# Génère un snapshot JSON de l'état des sites hébergés sur le VPS.
# Déclenché toutes les 2h par vps-status-check.timer.
set -euo pipefail

OUTPUT_DIR="/var/www/status-data"
OUTPUT_FILE="$OUTPUT_DIR/status.json"

check_port() {
  (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null
}

check_unit() {
  systemctl is-active --quiet "$1"
}

check_nginx() {
  systemctl is-active --quiet nginx
}

site_status() {
  local type="$1"
  shift
  case "$type" in
    static)
      check_nginx && echo up || echo down
      ;;
    unit)
      check_unit "$1" && echo up || echo down
      ;;
    port)
      local ok=1
      for p in "$@"; do
        check_port "$p" || ok=0
      done
      [ "$ok" -eq 1 ] && echo up || echo down
      ;;
    retired)
      echo retired
      ;;
  esac
}

# label|domain|type|args (unit name, ou liste de ports séparés par des espaces)
SITES=(
  "Portfolio|thomasbasquin.fr|static"
  "Pokédex|pokedex.thomasbasquin.fr|static"
  "Martin Basquin|martinbasquin.thomasbasquin.fr|static"
  "Marie Wach|mariewach.fr|static"
  "Quiz ostéopathie|quiz.thomasbasquin.fr|static"
  "MyShelf|myshelf.thomasbasquin.fr|unit|myshelf.service"
  "Stats (code-server)|stats.thomasbasquin.fr|unit|code-server@titouan.service"
  "Notes|notes.thomasbasquin.fr|port|8080"
  "Home|home.thomasbasquin.fr|port|5555"
  "Ressources|ressources.thomasbasquin.fr|port|5173 3000"
  "Browser|browser.thomasbasquin.fr|port|3010"
  "Todo|todo.thomasbasquin.fr|port|9090 2555"
  "Ostéo Marie Wach (ancien)|osteo.thomasbasquin.fr|retired"
)

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

{
  printf '{\n  "generated_at": "%s",\n  "sites": [\n' "$(date -Iseconds)"
  count=${#SITES[@]}
  for i in "${!SITES[@]}"; do
    IFS='|' read -r label domain type rest <<< "${SITES[$i]}"
    status=$(site_status "$type" $rest)
    comma=","
    [ "$i" -eq $((count - 1)) ] && comma=""
    printf '    {"label": "%s", "domain": "%s", "status": "%s"}%s\n' \
      "$label" "$domain" "$status" "$comma"
  done
  printf '  ]\n}\n'
} > "$TMP_FILE"

mkdir -p "$OUTPUT_DIR"
mv "$TMP_FILE" "$OUTPUT_FILE"
chmod 644 "$OUTPUT_FILE"
