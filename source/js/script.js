let openMenu = document.querySelector(".page-header__toggle");
let closeMenu = document.querySelector(".main-nav__toggle ");
let menu = document.querySelector(".main-nav");


menu.classList.remove("main-nav--openned");
menu.classList.add("main-nav--closed");

openMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.remove("main-nav--closed");
  menu.classList.add("main-nav--openned");
});
closeMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.remove("main-nav--openned");
  menu.classList.add("main-nav--closed");
});

