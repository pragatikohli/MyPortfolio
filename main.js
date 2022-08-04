const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");
const links = document.querySelectorAll(".nav-link");
const togglebtn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger");
window.addEventListener("scroll", () => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
});
// Sticky Navbar
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);
// Reveal Animation
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});
sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });
// Skills Progress Bar Animation
function hasreached(el) {
  let topPosition = el.getBoundingClientRect().top;
  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}
function updateCount(num, maxNum) {
  let currentNum = +num.innerText;
  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}
let skillsPlayed = false;
function skillsCounter() {
  if (!hasreached(first_skill)) return;
  skillsPlayed = true;
  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);
    progress_bars[i].style.setProperty("--target", strokeValue);
    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });
  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}
//Change Active Link on Scroll
function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections)
    .map((sct, i) => {
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0);
  let curSectionId = passedSections.at(-1).id;
  links.forEach((l) => l.classList.remove("active"));
  links[curSectionId].classList.add("active");
}
activeLink();
//Dark Theme
let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);
function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    togglebtn.classList.replace("fa-moon", "fa-sun-bright");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    togglebtn.classList.replace("fa-sun-bright", "fa-moon");
    localStorage.setItem("dark", 0);
  }
}
togglebtn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});
//Open and Close Navbar Menu
hamburger.addEventListener("click", () => {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
});
links.forEach((link) =>
  link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
  })
);
