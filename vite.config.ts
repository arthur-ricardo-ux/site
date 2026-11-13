import { resolve } from 'node:path';
import type { Connect } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Multi-page: cada estudo de caso é um HTML próprio (/agreement/), então a navegação a partir
// da Home é um link real — a página nova sempre abre no topo e o "voltar" restaura a Home.
const pages = { main: 'index.html', agreement: 'agreement/index.html' };

/** /agreement → /agreement/ (sem isso o fallback de SPA do Vite serviria a Home) */
const addTrailingSlash: Connect.NextHandleFunction = (req, res, next) => {
  const [path, query] = (req.url ?? '').split('?');
  const isPage = Object.values(pages).some((file) => file !== 'index.html' && `/${file.replace('/index.html', '')}` === path);
  if (!isPage) return next();
  res.statusCode = 301;
  res.setHeader('Location', `${path}/${query ? `?${query}` : ''}`);
  res.end();
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'page-trailing-slash',
      configureServer: (server) => void server.middlewares.use(addTrailingSlash),
      configurePreviewServer: (server) => void server.middlewares.use(addTrailingSlash),
    },
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([name, file]) => [name, resolve(import.meta.dirname, file)])),
    },
  },
});
