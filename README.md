# AetherQuant Landing Page & Client Portal

This repository hosts the public frontend static assets for AetherQuant's quantitative market signals and causal discovery feed.

## Deployment

The static files are configured for one-click hosting on **GitHub Pages**:
1. Simply go to **Settings** > **Pages** in this GitHub repository.
2. Select **Branch: main** (or master) and folder `/` (root).
3. Click **Save**. The website will be live at your custom user URL (e.g., `https://<owner>.github.io/aetherquant-site/`).

## Architecture & Integration

- **Frontend**: Lightweight static glassmorphic dashboard (`index.html`) using HTML5, vanilla CSS, and vanilla JS. Fully responsive.
- **Backend API**: Connects to the private AetherQuant core running FastAPI and SQLite.
- **Connection Configuration**: In order to avoid mixed-content blocks (since GitHub Pages is served over HTTPS and your development environment might be HTTP on localhost), use the **Settings Gear** in the top navigation bar to dynamically point the site to your local development instance (`http://localhost:8000`) or public VM endpoint.

## Features

- **Live Sandbox Console**: Test live quantitative signals, convergent cross-mapping causality validations, and programmatic security sweeps directly in the browser.
- **Interactive User Dashboard**: Register, sign in, generate active API keys, and trigger Stripe checkout links to upgrade tiers dynamically.
- **Stripe Underwriting Disclosures**: Includes comprehensive legal links (Terms of Service, Privacy Policy, Cookie Directive) and contact metadata to satisfy Stripe merchant compliance.
