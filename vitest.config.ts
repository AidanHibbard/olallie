import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['src/**/*', 'node_modules'],
    alias: {
      '@/': new URL('spec/', import.meta.url).pathname,
    },
  },
});