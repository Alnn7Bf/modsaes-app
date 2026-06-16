import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {src: 'README.md', dest: ''}
      ]
    }),
    visualizer({
      filename: "stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    rollupOptions: {
      input: "src/Content.tsx",
      output: {
        format: "iife",
        entryFileNames: "content.js"
      }
    },
    outDir: "dist",
    emptyOutDir: true
  }
})
