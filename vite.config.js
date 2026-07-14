import { defineConfig } from 'vite';

// GitHub Pages serves a project site from /<repo>/, so assets must be requested
// from there rather than from /. Change `base` if you rename the repository.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Advancedsa/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
