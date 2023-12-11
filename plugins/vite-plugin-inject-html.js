import { normalizePath } from "vite";
import fs from "fs";
import path from "node:path";

const tags = /<snippet src="([^"]+)"(.*?)\/>/g;

const getSnippetContent = (content) => {
  const matches = content.matchAll(tags);

  for (const match of matches) {
    let [tag, url] = match;
    let out = tag;
    const filePath = normalizePath(path.join("./src", url));

    try {
      let data = fs.readFileSync(filePath, "utf-8");
      out = getSnippetContent(data, url);
    } catch (error) {
      if (error instanceof Error) {
        out = "";
        console.log(error);
      }
    }

    content = content.replace(tag, out);
  }

  return content;
};

export default function injectHtml() {
  return {
    name: "inject-html",
    enforce: "pre",
    transformIndexHtml(html) {
      return getSnippetContent(html);
    },
    handleHotUpdate({ server }) {
      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    },
  };
}
