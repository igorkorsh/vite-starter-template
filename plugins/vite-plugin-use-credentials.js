export default function useCredentials() {
  return {
    name: "use-credentials",
    transformIndexHtml(html) {
      return html.replaceAll("crossorigin ", "").replaceAll('type="module"', "defer");
    },
  };
}
