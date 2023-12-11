import fg from "fast-glob";
import fs from "fs";
import path from "node:path";
import { parse } from "node-html-parser";

const getSpriteContent = (pattern) => {
  const symbols = [];

  try {
    const files = fg.sync(pattern);

    for (const file of files) {
      let content = fs.readFileSync(file, "utf-8");
      const name = path.basename(file, ".svg");
      const svgElement = parse(content).querySelector("svg");
      const symbol = parse("<symbol />").querySelector("symbol");
      symbol.setAttribute("id", name);

      if (!svgElement.attributes.fill) {
        symbol.setAttribute("fill", "currentColor");
      } else {
        symbol.setAttribute("fill", svgElement.attributes.fill);
      }

      if (svgElement.attributes.viewBox) {
        symbol.setAttribute("viewBox", svgElement.attributes.viewBox);
      }

      svgElement.childNodes.forEach((child) => symbol.appendChild(child));
      symbols.push(symbol.toString());
    }
  } catch (error) {
    console.error("Error reading or parsing SVG files:", error);
  }

  return symbols.join("");
};

export default function svgSprite(pattern) {
  return {
    name: "svg-sprite",
    transformIndexHtml(html) {
      return html.replace("<!-- vite-plugin:svg-sprite -->", getSpriteContent(pattern));
    },
    handleHotUpdate({ server }) {
      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    },
  };
}
