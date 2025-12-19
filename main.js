document.addEventListener("DOMContentLoaded", function () {
  // set current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = y;

  // nav toggle for small screens (use class for mobile overlay)
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  // create mobile nav wrapper if not present
  if (nav) {
    const mobile = document.createElement("div");
    mobile.className = "nav--mobile";
    // move nav links into mobile wrapper for small screens
    mobile.appendChild(nav.cloneNode(true));
    document.body.appendChild(mobile);
    // keep reference to mobile nav
    const mobileNav = mobile;
    toggle &&
      toggle.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        // aria
        toggle.setAttribute("aria-expanded", mobileNav.classList.contains("open"));
      });
    // close when clicking a link inside mobile nav
    mobileNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") mobileNav.classList.remove("open");
    });
    // close on resize to large screens
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) mobileNav.classList.remove("open");
    });
  }

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
