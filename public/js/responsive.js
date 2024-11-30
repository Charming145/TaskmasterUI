const navResponsiveBtn = document.querySelector(".mobile-responsive-btn");
const navBarEl = document.querySelector(".responsive-header");
const closeNav = document.querySelector(".close-responsive-btn");
navResponsiveBtn &&
  navResponsiveBtn.addEventListener("click", () => {
    navBarEl.style.display = "block";
    setTimeout(() => {
      navBarEl.style.opacity = 1;
    }, 500);
  });
closeNav &&
  closeNav.addEventListener("click", () => {
    navBarEl.style.opacity = 0;
    setTimeout(() => {
      navBarEl.style.display = "none";
    }, 500);
  });
