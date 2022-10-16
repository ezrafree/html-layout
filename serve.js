var express = require("express");
var compression = require("compression");
var consola = require("consola");
var chalk = require("chalk");
var portscanner = require("portscanner");
var ip = require("ip");
var path = require("path");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
var open = require("open");
var find = require("find-process");

var liveReloadServer = livereload.createServer({
  exts: ["scss", "html"],
});
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var port = process.env.PORT || 0;

var app = express();

var args = process.argv.slice(2);

if (args[0] === "production") {
  app.use(compression());
}

if (args[0] !== "production") app.use(connectLiveReload());

app.get("/", function (_req, res) {
  res.sendFile(
    path.join(
      __dirname,
      args[0] === "production" ? "./dist/index.html" : "./index.html"
    )
  );
});

app.use("/", express.static(path.join(__dirname, ".")));

var preferredPorts = [
  3000, 4000, 8000, 9000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009,
  3010, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010, 8001, 8002,
  8003, 8004, 8005, 8006, 8007, 8008, 8009, 8010, 9001, 9002, 9003, 9004, 9005,
  9006, 9007, 9008, 9009, 9010,
];

portscanner.findAPortNotInUse(preferredPorts).then((available) => {
  var listener = app.listen(port || available || 0, function (err) {
    if (err) consola.error(chalk.white.bold("Error: "), `${err}`);

    consola.info({
      message: `App listening on port ${listener.address().port}`,
      badge: true,
    });

    consola.success(
      chalk.white.bold("Local:           "),
      `http://localhost:${listener.address().port}`
    );

    consola.success(
      chalk.white.bold("On Your Network: "),
      `http://${ip.address()}:${listener.address().port}`
    );

    if (args[0] === "production") {
      consola.info({
        message: "Enabling gzip compression",
        badge: true,
      });
    }
    if (args[0] !== "production") {
      consola.info({
        message: "Enabling hot reloading",
        badge: true,
      });
    }

    find("name", "Google Chrome", true).then(function (list) {
      if (list.length === 0) {
        consola.info({
          message: `Opening the app in Google Chrome`,
          badge: true,
        });

        open(`http://localhost:${listener.address().port}`, {
          app: { name: "google chrome", arguments: ["--incognito"] },
        });
      }
    });
  });
});
