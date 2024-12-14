import { mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mts';

export default mergeConfig(viteConfig, {
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
});
