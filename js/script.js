window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
};

var toggle = function (elem) {
  elem.classList.toggle("is-visible");
  document.body.classList.toggle("modal-open");
};

document
  .getElementById("nav-toggle")
  .addEventListener("click", function (event) {
    if (event.target.id === "check") {
      toggle(document.querySelector("#root > header > nav"));
    }
  });

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log(
        "ServiceWorker registration successful with scope:",
        registration.scope
      );
    })
    .catch(function (error) {
      console.log("ServiceWorker registration failed:", error);
    });
}
