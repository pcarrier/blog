import { IdAttributePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import minifier from "html-minifier-terser";

const metadata = {
  language: "en",
  title: "Small dose of nothing",
  subtitle: "subtitles are overrated",
  description: "descriptions are overrated",
  base: "https://nothing.pcarrier.com/",
  author: {
    name: "Pierre Carrier",
    email: "pc@rrier.fr",
  },
};

async function htmlmin(content) {
  return await minifier.minify(content, {
    useShortDoctype: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeRedundantAttributes: true,
  });
}

export default function (cfg) {
  cfg.addPlugin(IdAttributePlugin);
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
  cfg.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata,
  });
  cfg.addPlugin(feedPlugin, {
    type: "json",
    outputPath: "/feed.json",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata,
  });
  ["assets", "sw.js", "xmit.toml"].forEach((p) => cfg.addPassthroughCopy(p));
  cfg.addFilter("limit", (arr, lim) => arr.slice(0, lim));
  cfg.addFilter(
    "dateDisplay",
    (date) => new Date(date).toISOString().split("T")[0],
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
  return {
    dir: {
      output: "dist",
    },
  };
}
