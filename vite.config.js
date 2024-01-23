import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mdx'],
  plugins: [react()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
