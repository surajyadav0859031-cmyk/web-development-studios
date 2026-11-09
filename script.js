const menuButton = document.querySelector(".menu-btn");
const menu = document.querySelector("#navMenu");

menuButton.addEventListener("click", function () {
    menu.classList.toggle("active");
});