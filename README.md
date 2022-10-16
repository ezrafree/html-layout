# Static HTML Layout Playground

This project sets up an ExpressJS server that serves a static `.html` file as a website to the browser. When starting the project, it launches an incognito Google Chrome window. While the HTML is a simple `.html` file, the `css/style.css` file is generated based on the SCSS files in the `scss/` directory. It also minifies the very little vanilla JavaScript it implements with UglifyJS.

This project is intended as a simple playground to build out website/page layouts.

## Usage Instructions

Before you begin, if you haven't already done so you'll need to install the dependencies.

```sh
yarn
```

Start the project to open the site locally in your browser.

```sh
yarn start
```

> When the project starts, if no Google Chrome process is running on your computer, it will open `localhost:3000` in an incognito window of Google Chrome.

The console output after running `yarn start` will print the output from both the express app and the SCSS compiler.

## To Do

- Update the project to use Express Router to enable browsing to various `.html` files by their URLs.
