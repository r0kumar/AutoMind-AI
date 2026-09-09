---
name: Artifact build environment
description: Environment variables required when building the AutoMind Vite artifact outside its managed workflow.
---

Standalone production builds of the web artifact require both `PORT` and `BASE_PATH`; the managed artifact workflow supplies them automatically.

**Why:** The Vite configuration intentionally fails fast when either value is missing, so a plain package build can look broken even when the app itself is healthy.

**How to apply:** For manual verification, run the artifact build with an available port and the artifact base path, for example `PORT=5173 BASE_PATH=/ ... run build`.