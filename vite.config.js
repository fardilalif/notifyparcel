import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { icons } from "./manifest.json";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: [".//favicon.ico"],
  manifest: {
    name: "NotifyParcel",
    short_name: "Notify Parcel",
    description: "A parcel management system",
    icon: icons,
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
