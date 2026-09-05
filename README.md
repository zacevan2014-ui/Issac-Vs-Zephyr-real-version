# Issac vs Zephyr: The Definitive Dossier

Combat database, episode theater, character frame telemetry, domain collision engine, fan forum, and hidden lore archive for the *Issac vs Zephyr* martial arts showdown series.

---

## Deploying to GitHub Pages

This repository is pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml` that compiles and deploys the Vite/React application automatically.

### 1-Minute Setup in GitHub:
1. Push your latest code changes to your GitHub repository (via **Publish** -> **Push changes to GitHub** in Google AI Studio).
2. Go to your repository on [GitHub](https://github.com).
3. Click on the **Settings** tab at the top.
4. On the left sidebar, click **Pages** (under the "Code and automation" section).
5. Under **Build and deployment** -> **Source**, click the dropdown and change it from **"Deploy from a branch"** to **"GitHub Actions"**.
6. That's it! GitHub Actions will trigger immediately under the **Actions** tab, build the application, and give you your active live URL (e.g. `https://<your-username>.github.io/<repo-name>/`).

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

---

## Production Build

```bash
# Generates static assets in /dist
npm run build
```
