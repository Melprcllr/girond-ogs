import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),

        VitePWA({
            registerType: "autoUpdate",

            manifest: {
                id: "/",
                name: "Girond'ogs",
                short_name: "Girond'ogs",
                description:
                    "Découvre les lieux de promenade accessibles aux chiens en Gironde.",

                lang: "fr",
                start_url: "/",
                scope: "/",
                display: "standalone",

                background_color: "#F3EFE5",
                theme_color: "#F3EFE5",

                icons: [
                    {
                        src: "/pwa/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/pwa/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },

            workbox: {
                globPatterns: [
                    "**/*.{js,css,html,ico,png,svg,webp,woff2}",
                ],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,
            },
        }),
    ],

    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.ts",
    },
});