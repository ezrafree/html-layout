import { generate } from "critical";

generate({
  inline: true,
  base: "./",
  src: "index.html",
  target: {
    html: "dist/index.html",
    css: "dist/critical.min.css",
    uncritical: "dist/style.min.css",
  },
  width: 1300,
  height: 900,
});
