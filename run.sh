#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

npm install
npx antora antora-playbook.yml --stacktrace
