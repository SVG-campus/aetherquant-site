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

- Live Sandbox Console: Test live quantitative signals, convergent cross-mapping causality validations, and programmatic security sweeps directly in the browser.
- Interactive User Dashboard: Register, sign in, generate active API keys, and trigger Stripe checkout links to upgrade tiers dynamically.
- Stripe Underwriting Disclosures: Includes comprehensive legal links (Terms of Service, Privacy Policy, Cookie Directive) and contact metadata to satisfy Stripe merchant compliance.

---

## 🛠️ Model Context Protocol (MCP) Server Integration

AI agents (like Claude Desktop or OpenClaw orchestrators) can consume AetherQuant tools directly in their workflows.

Add the following to your Claude Desktop configuration file (`%APPDATA%/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "aetherquant-mcp": {
      "command": "python",
      "args": [
        "c:/Users/svillalobosgonzalez1/Documents/GitHub/automated-businesses/src/api/mcp_server.py"
      ],
      "env": {
        "AETHERQUANT_API_URL": "https://api.aetherquant.cloud"
      }
    }
  }
}
```

### Supported MCP Tools
* `get_signals(ticker, api_key)`: Fetch latest BUY/SELL triggers and confidence ratings.
* `validate_causality(cause, effect, api_key)`: Execute Convergent Cross-Mapping (CCM) analysis.
* `run_topological_analysis(ticker, api_key)`: Extract attractor Betti curves and Euler characteristic invariants.

---

## 💻 Downloadable CLI Client

Manage your quantitative models directly from your local terminal. The script is available under the repository directory at `src/api/cli.py`.

### Configuration
Update your default API base URL to the production server:
```bash
python cli.py config --url https://api.aetherquant.cloud
```

### Standard Commands
1. **Developer Login**:
   ```bash
   python cli.py auth login --email your@firm.com
   ```
2. **Generate API Keys**:
   ```bash
   python cli.py key create
   ```
3. **Fetch Market Signals**:
   ```bash
   python cli.py signal BTCUSD
   ```
4. **CCM Causality Analysis**:
   ```bash
   python cli.py validate BTCUSD ETHUSD
   ```
5. **Topological homological invariants**:
   ```bash
   python cli.py tda BTCUSD
   ```
6. **Rolling Volatility Estimation**:
   ```bash
   python cli.py volatility BTCUSD
   ```

---

## 📈 Programmatic SEO (Causality Indexes)

AetherQuant pre-compiles and deploys static reports for high-value asset pairs to optimize organic search engine indices. You can explore pre-compiled reports under the `/causality` directories:
* **Bitcoin vs Ethereum**: `https://aetherquant.cloud/causality/BTCUSD-vs-ETHUSD/`
* **Bitcoin vs S&P 500**: `https://aetherquant.cloud/causality/BTCUSD-vs-SPY/`
* **Ethereum vs Apple**: `https://aetherquant.cloud/causality/ETHUSD-vs-AAPL/`

