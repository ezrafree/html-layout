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
