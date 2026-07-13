(function () {
  "use strict";

  function preferredTheme() {
    var stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    var isDark = theme === "dark";
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    if (persist) localStorage.setItem("theme", theme);

    var control = document.querySelector("#color-theme-toggle > a");
    if (control) {
      var label = isDark ? "Switch to light mode" : "Switch to dark mode";
      control.setAttribute("aria-label", label);
      control.setAttribute("title", label);
      control.setAttribute("aria-pressed", isDark ? "true" : "false");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var control = document.querySelector("#color-theme-toggle > a");
    applyTheme(preferredTheme(), false);
    if (!control) return;

    function toggle() {
      var next = document.documentElement.hasAttribute("data-theme") ? "light" : "dark";
      applyTheme(next, true);
    }

    control.addEventListener("click", toggle);
    control.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
      if (!localStorage.getItem("theme")) applyTheme(event.matches ? "dark" : "light", false);
    });
  });
}());
