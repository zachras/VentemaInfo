(function () {
  var root = document.documentElement;
  var storageKey = "ventema-theme";
  var canvas = { light: "#F7F3E8", dark: "#15170F" };
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  var unsavedChoice = null;

  function chosenTheme() {
    var value = unsavedChoice;
    try {
      value = localStorage.getItem(storageKey) || unsavedChoice;
    } catch (error) {}
    return value === "light" || value === "dark" ? value : null;
  }

  function choose(theme) {
    unsavedChoice = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {}
  }

  function effectiveTheme() {
    return chosenTheme() || (systemDark.matches ? "dark" : "light");
  }

  function applyTheme() {
    var chosen = chosenTheme();
    if (chosen) {
      root.setAttribute("data-theme", chosen);
    } else {
      root.removeAttribute("data-theme");
    }

    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      if (meta.dataset.media === undefined) meta.dataset.media = meta.getAttribute("media") || "";
      if (chosen) {
        meta.setAttribute("content", canvas[chosen]);
        meta.removeAttribute("media");
      } else {
        meta.setAttribute("media", meta.dataset.media);
        meta.setAttribute("content", meta.dataset.media.indexOf("dark") >= 0 ? canvas.dark : canvas.light);
      }
    });

    var pressed = effectiveTheme() === "dark" ? "true" : "false";
    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.setAttribute("aria-pressed", pressed);
    });
  }

  root.classList.add("js");
  applyTheme();

  systemDark.addEventListener("change", function () {
    if (!chosenTheme()) applyTheme();
  });

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme();

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        choose(effectiveTheme() === "dark" ? "light" : "dark");
        applyTheme();
      });
    });

    var menus = document.querySelectorAll("details.lang");
    document.addEventListener("click", function (event) {
      menus.forEach(function (menu) {
        if (menu.open && !menu.contains(event.target)) menu.open = false;
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      menus.forEach(function (menu) {
        if (!menu.open) return;
        menu.open = false;
        menu.querySelector("summary").focus();
      });
    });
  });
})();
