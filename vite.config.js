const path = require('path');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [react()],
  publicDir: false,
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'frontend/src/main.jsx'),
      fileName: () => 'app.js',
      formats: ['es'],
      name: 'NoTorsionFrontend'
    },
    outDir: path.resolve(__dirname, 'public/react-app'),
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => (
          assetInfo && assetInfo.name && assetInfo.name.endsWith('.css')
            ? 'app.css'
            : 'assets/[name]-[hash][extname]'
        ),
        entryFileNames: 'app.js'
      }
    }
  }
});
