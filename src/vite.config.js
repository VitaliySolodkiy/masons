import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}

    return defineConfig({
        plugins: [
            react(),
            laravel({
                input: ['resources/css/app.scss', 'resources/js/index.jsx'],
                refresh: true
            }),
        ],
        server: {
            host: '0.0.0.0',
            port: 5173,
            hmr: {
                clientPort: 5173,
                host: process.env.VITE_APP_HOST, //site address laravel-gpt.com
                protocol: 'ws',
            },
            watch: {
                usePolling: true,
            },
            cors: {
                origin: 'http://' + process.env.VITE_APP_HOST, //laravel-gpt.com
                credentials: true,
            },
            https: false,
        },
    });
};
