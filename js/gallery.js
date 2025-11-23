"use strict";

// Trigger the polaroid swing when the gallery grids are present/visible.
(function () {
  window.addEventListener("load", () => {
    const grids = Array.from(document.querySelectorAll(".gallery-grid"));
    const duration = 10000;

    if (!grids.length) return;

    const startAnim = (grid) => {
      if (!grid || grid.classList.contains("active")) return;
      grid.classList.add("active");
      setTimeout(() => grid.classList.remove("active"), duration);
    };

    const triggerAll = () => grids.forEach(startAnim);

    triggerAll(); // on load
    document.addEventListener("scroll", triggerAll, { passive: true });
    window.addEventListener("resize", triggerAll);
  });
})();
