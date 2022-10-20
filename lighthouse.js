#!/usr/bin/env node
const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const open = require("open");
const consola = require("consola");
const chalk = require("chalk");

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "silent", // 'silent'|'error'|'info'|'verbose'
    output: "html",
    // onlyCategories: ["performance"],
    port: chrome.port, // this is the port that chrome debugger runs on
  };
  const runnerResult = await lighthouse(process.argv.slice(2)[0], options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync("lighthouse-report.html", reportHtml);

  const performanceScore = runnerResult.lhr.categories.performance.score * 100;
  const accessibilityScore =
    runnerResult.lhr.categories.accessibility.score * 100;
  const bestPracticesScore =
    runnerResult.lhr.categories["best-practices"].score * 100;
  const seoScore = runnerResult.lhr.categories.seo.score * 100;
  const pwaScore = runnerResult.lhr.categories.pwa.score * 100;

  // `.lhr` is the Lighthouse Result as a JS object
  consola.info({
    message: `Running a lighthouse report for ${runnerResult.lhr.finalUrl}`,
    badge: false,
  });

  if (performanceScore == 100) {
    consola.success(chalk.white.bold("Performance: "), `${performanceScore}`);
  } else {
    console.log(
      chalk.red.bold("x"),
      chalk.white.bold("Performance: "),
      `${performanceScore}`
    );
  }

  if (accessibilityScore == 100) {
    consola.success(
      chalk.white.bold("Accessibility: "),
      `${accessibilityScore}`
    );
  } else {
    console.log(
      chalk.red.bold("x"),
      chalk.white.bold("Accessibility: "),
      `${accessibilityScore}`
    );
  }

  if (bestPracticesScore == 100) {
    consola.success(
      chalk.white.bold("Best Practices: "),
      `${bestPracticesScore}`
    );
  } else {
    console.log(
      chalk.red.bold("x"),
      chalk.white.bold("Best Practices: "),
      `${bestPracticesScore}`
    );
  }

  if (seoScore == 100) {
    consola.success(chalk.white.bold("SEO: "), `${seoScore}`);
  } else {
    console.log(chalk.red.bold("x"), chalk.white.bold("SEO: "), `${seoScore}`);
  }

  if (pwaScore == 100) {
    consola.success(chalk.white.bold("PWA: "), `${pwaScore}`);
  } else {
    console.log(chalk.red.bold("x"), chalk.white.bold("PWA: "), `${pwaScore}`);
  }

  await chrome.kill();

  if (
    performanceScore == 100 &&
    accessibilityScore == 100 &&
    bestPracticesScore == 100 &&
    seoScore == 100 &&
    pwaScore == 100
  ) {
    consola.success({
      message: "Perfect score! WOOHOO!",
      badge: true,
    });

    if (process.argv.slice(2)[1] === "--view") {
      (async () => {
        await open("lighthouse-report.html", { wait: true });
      })();
    }
  } else {
    consola.error({
      message: "Lighthouse tests failed, exiting...",
      badge: true,
    });

    (async () => {
      await open("lighthouse-report.html", { wait: true });
    })();

    process.exit(1);
  }
})();
