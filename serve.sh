#!/bin/bash
PORT=${PORT:-3000}
exec /usr/bin/python3 -m http.server "$PORT"
