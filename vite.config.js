import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png"],
      // start_url and scope are left out on purpose. The plugin fills them in from Vite's
      // `base`, so the app also installs correctly from a sub-path like GitHub Pages.
      manifest: {
        name: "Uptime, Developer Movement Tracker",
        short_name: "Uptime",
        description: "A daily movement and stretch routine tracker for developers, with form-cue videos and a streak log.",
        lang: "en",
        categories: ["health", "fitness"],
        theme_color: "#2F6F5E",
        background_color: "#F4F7F3",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        // woff2 is included so the bundled fonts are cached and the app looks the same offline.
        globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"]
      }
    })
  ]
});
