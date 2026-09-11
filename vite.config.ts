import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Self-destroying service worker: unregisters the old PWA worker on every
    // visitor's next visit, clears its caches, and disables offline caching so
    // each deploy is visible on first load. Do not remove until this has shipped.
    VitePWA({
      registerType: 'autoUpdate',
      selfDestroying: true,
      manifest: false,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
