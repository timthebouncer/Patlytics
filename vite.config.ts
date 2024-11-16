import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from "vite-plugin-checker";
import { config } from 'dotenv';

config();
export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true,
        }),
    ],
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
            },
        },
    },
    define: {
        'process.env': process.env
    }
})