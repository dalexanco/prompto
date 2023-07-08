import { defineConfig } from 'vite';
import { resolve } from 'path';
import { chromeExtension } from 'vite-plugin-chrome-extension';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const sourceDir = resolve(__dirname, 'src');

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths(), chromeExtension()],
  sourceMap: true,
  resolveJsonModule: true,
  importHelpers: true,
  removeComments: true,
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'manifest.json')
    }
  },
  resolve: {
    alias: {
      '@src': sourceDir
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
});
