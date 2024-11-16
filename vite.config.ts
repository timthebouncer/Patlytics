import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from "vite-plugin-checker";
import { config } from 'dotenv';

config();
export default defineConfig(config => {
    return {
        plugins: [
            react(),
            checker({
                typescript: true,
            }),
        ],
        // base: config.command === 'build' ? './' : undefined,
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
    }
})