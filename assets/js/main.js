const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const copyFeedback = document.getElementById("copyFeedback");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const currentYear = document.getElementById("currentYear");
const navbarCollapse = document.getElementById("navbarNav");

function applyTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("theme-dark", isDark);
  body.classList.toggle("theme-light", !isDark);
  themeIcon.classList.toggle("fa-moon", !isDark);
  themeIcon.classList.toggle("fa-sun", isDark);
  localStorage.setItem("portfolio-theme", theme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (preferredDark ? "dark" : "light"));
}

function setActiveNav() {
  const offset = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (!correspondingLink) {
      return;
    }

    const isActive = offset >= top && offset < top + height;
    correspondingLink.classList.toggle("active", isActive);
  });
}

function collapseMobileMenu() {
  if (!navbarCollapse || !navbarCollapse.classList.contains("show")) {
    return;
  }

  const bootstrapCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
  if (bootstrapCollapse) {
    bootstrapCollapse.hide();
  }
}

async function copyEmail() {
  const email = copyEmailBtn?.dataset.email;
  if (!email) {
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = "Email copied to clipboard.";
  } catch (error) {
    copyFeedback.textContent = "Clipboard access failed. Use the email button instead.";
  }

  copyFeedback.classList.add("visible");
  window.setTimeout(() => {
    copyFeedback.classList.remove("visible");
  }, 2200);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", collapseMobileMenu);
});

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", copyEmail);
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

initializeTheme();
setActiveNav();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
