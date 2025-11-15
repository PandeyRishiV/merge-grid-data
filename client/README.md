# Client


## Prerequisites
- Node.js (recommended v16+)
- npm

## Install
From the repository root or inside the `client` folder:
```bash
cd /Users/pavelshermayster/code/questions/merge-changes/client
npm install

```

## Run (development)

```bash
npm run dev    # for Vite/modern setups

```


## Build (production)
```bash
npm run build
```

## Tests / Lint
```bash
npm test
npm run lint
```

## Troubleshooting
- If installs fail: remove `node_modules` and lockfile, then reinstall:
  ```bash
  rm -rf node_modules package-lock.json yarn.lock
  npm install
  ```
- Use nvm to switch node versions if required:
  ```bash
  nvm use
  ```

