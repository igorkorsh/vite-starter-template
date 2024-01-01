import { defineConfig } from "vite";
import injectHtml from "./plugins/vite-plugin-inject-html";
import svgSprite from "./plugins/vite-plugin-svg-sprite";
import useCredentials from "./plugins/vite-plugin-use-credentials";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import autoprefixer from "autoprefixer";
import postcssInlineSvg from "postcss-inline-svg";
import postcssRtl from "postcss-rtl";
import { projectId } from "./package.json";

const isBuild = process.argv.includes("build");
const isMarketo = process.argv.includes("marketo");

export default defineConfig({
  root: "src",
  base: isMarketo ? "https://go.kaspersky.com/rs/802-IJN-240/" : "./",
  plugins: [
    injectHtml(),
    svgSprite("src/sprite/**/*.svg"),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i,
      jpg: {
        quality: 92,
        progressive: true,
        quantizationTable: 3,
        trellisQuantisation: true,
      },
      png: { quality: 92 },
    }),
    isBuild && useCredentials(),
  ],
  css: {
    postcss: {
      plugins: [postcssInlineSvg(), postcssRtl(), autoprefixer()],
    },
  },
  build: {
    modulePreload: false,
    outDir: isMarketo ? "../marketo" : "../build",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        page_1: "src/index.html",
        // page_2: "src/page_2.html",
      },
      output: {
        manualChunks: () => "app.js",
        assetFileNames: (assetInfo) => {
          if (/\.css$/i.test(assetInfo.name)) {
            const cssDir = isMarketo ? "images" : "styles";
            return `${cssDir}/L${projectId}_style.css`;
          } else if (/\.pdf$/i.test(assetInfo.name)) {
            return `assets/[name].[ext]`;
          } else {
            return `images/L${projectId}_[name].[ext]`;
          }

          return `assets/[name].[ext]`;
        },
        entryFileNames: () => {
          const jstDir = isMarketo ? "images" : "scripts";
          return `${jstDir}/L${projectId}_app.js`;
        },
      },
    },
    emptyOutDir: true,
    cssMinify: "lightningcss",
  },
  optimizeDeps: { include: ["src/*.html"] },
});
