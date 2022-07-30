const header = document.querySelector("header");
// Sticky Navbar
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}
window.addEventListener("scroll", stickyNavbar);
