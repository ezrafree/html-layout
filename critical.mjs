import { generate } from "critical";

generate({
  inline: true,
  base: "./",
  src: "index.html",
  target: {
    html: "build/index.html",
    css: "build/critical.min.css",
    uncritical: "build/style.min.css",
  },
  width: 1300,
  height: 900,
});
