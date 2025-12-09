// @ts-check
import { defineConfig } from '@vben/eslint-config';

export default defineConfig([
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production'?'off':'warn', // 或按生产模式区分
    },
  },
]);
