import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import minifier from "html-minifier-terser";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

async function htmlmin(content) {
  return await minifier.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
  });
}
export default function (cfg) {
  cfg.addPlugin(syntaxHighlight);
  cfg.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "jpeg"],
    widths: ["512", "1024", "2048", "auto"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "auto",
    },
    sharpAvifOptions: {
      effort: 9,
      quality: 60,
    },
  });
  cfg.addPassthroughCopy("xmit.toml");
  cfg.addPassthroughCopy("assets");
  cfg.addFilter("limit", (arr, lim) => arr.slice(0, lim));
  cfg.addFilter("rfc3339", (date) => new Date(date).toISOString());
  cfg.addFilter("stringify", (v) => JSON.stringify(v));
  cfg.addFilter(
    "dateDisplay",
    (date) => new Date(date).toISOString().split("T")[0]
  );
  cfg.addFilter("htmlmin", htmlmin);
  cfg.addTransform("minify", function (content) {
    const outPath = this.page.outputPath || "";
    if (outPath.endsWith(".html")) {
      return htmlmin(content);
    }
    if (outPath.endsWith(".json")) {
      return JSON.stringify(JSON.parse(content));
    }
    return content;
  });
  cfg.setNunjucksEnvironmentOptions({
    autoescape: false,
  });
  return {
    dir: {
      output: "dist",
    },
  };
}
