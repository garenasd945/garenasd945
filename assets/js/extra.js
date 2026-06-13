/* ==========================================================================
   extra.js  —  Progressive enhancements (loaded with `defer`)
   --------------------------------------------------------------------------
   Adds, without touching any existing theme script:
     • Dark / light theme toggle (remembers choice, respects OS preference)
     • Reading-progress bar
     • Back-to-top button
     • Scroll-reveal animation for cards & sections
     • Active section highlight in the top navigation

   渐进增强脚本，与主题原有脚本互不干扰：暗色模式、阅读进度条、回到顶部、
   滚动浮现、导航高亮。
   ========================================================================== */
(function () {
  "use strict";

  /* ----- 1. Theme toggle ------------------------------------------------- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = mode === "dark" ? "☀️" : "🌙";
  }

  function makeFab(id, label, title) {
    var b = document.createElement("button");
    b.id = id;
    b.className = "fab";
    b.type = "button";
    b.setAttribute("aria-label", title);
    b.title = title;
    b.textContent = label;
    document.body.appendChild(b);
    return b;
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* theme button */
    var themeBtn = makeFab("theme-toggle", "🌙", "Toggle dark / light mode");
    setTheme(root.getAttribute("data-theme"));
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });

    /* back-to-top button */
    var topBtn = makeFab("back-to-top", "↑", "Back to top");
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* reading-progress bar */
    var bar = document.createElement("div");
    bar.id = "reading-progress";
    document.body.appendChild(bar);

    function onScroll() {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      bar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + "%";
      topBtn.classList.toggle("show", scrolled > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* scroll-reveal for cards & section headings */
    var targets = document.querySelectorAll(
      ".page__content > h1, .paper-box, .resource-box, .author__avatar"
    );
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.08 });
      targets.forEach(function (el) {
        el.classList.add("reveal");
        io.observe(el);
      });
    }

    /* active section highlight in nav */
    var navLinks = document.querySelectorAll(".greedy-nav .visible-links a");
    var map = {};
    navLinks.forEach(function (a) {
      var hash = a.getAttribute("href");
      var i = hash ? hash.indexOf("#") : -1;
      if (i >= 0) map[hash.slice(i + 1)] = a;
    });
    var anchors = document.querySelectorAll("span.anchor[id], h1[id]");
    if ("IntersectionObserver" in window && anchors.length) {
      var current = null;
      var navIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var link = map[en.target.id];
            if (link && link !== current) {
              if (current) current.style.color = "";
              link.style.color = "var(--accent)";
              current = link;
            }
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      anchors.forEach(function (el) { navIo.observe(el); });
    }
  });
})();
