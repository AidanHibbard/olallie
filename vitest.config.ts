import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['src/**/*', 'node_modules', 'spec/mock_stores/**/*'],
    alias: {
      '@/': new URL('spec/', import.meta.url).pathname,
    },
  },
});