import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['./src/**/*'],
  },
  base: 'https://abdelrahman-mh.github.io/age-calculator/',
  css: {
    preprocessorOptions: {
      sass: {
        outputStyle: 'compressed',
        sourceMap: true,
        includePaths: ['src/styles'],
        precision: 6,
      },
    },
  },
});
