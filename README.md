# 🤖 Bot Battlr

A React app that allows users to view, enlist, and manage their bot army.

## Features
- Fetches bot data from a local JSON server.
- Add/remove bots from your army.
- Permanently delete bots (both backend and frontend).
- Prevents duplicate enlistments.

## Setup
1. Clone the repository.
2. Run `npm install`.
3. Start JSON server:
   ```bash
   json-server --watch db.json --port 8001
