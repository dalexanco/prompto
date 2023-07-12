import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const sourceDir = resolve(__dirname, 'src');

const ROOT_HARD_FILES = ['background'];
const DEFAULT_ENTRY_FILENAME = 'assets/[name]-[hash].js';

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background/index.ts')
      },
      output: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        entryFileNames: (file: any) => {
          return ROOT_HARD_FILES.includes(file.name)
            ? `[name].js`
            : DEFAULT_ENTRY_FILENAME;
        }
      }
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
