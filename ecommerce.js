"use strict";


/* =====================================
   1. DOM ELEMENTS
===================================== */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const currentYear = document.getElementById("currentYear");


/* =====================================
   2. MOBILE NAVIGATION
===================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    /* Close menu after clicking a link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

        const clickedInside =
            navMenu.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInside) {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* Close menu with Escape key */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}


/* =====================================
   3. AUTOMATIC COPYRIGHT YEAR
===================================== */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =====================================
   4. FAQ ACCORDION
===================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    item.addEventListener("toggle", function () {

        if (item.open) {

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.open = false;

                }

            });

        }

    });

});


/* =====================================
   5. HEADER SCROLL SHADOW
===================================== */

const header = document.querySelector(".header");

if (header) {

    function updateHeader() {

        if (window.scrollY > 20) {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.06)";

        } else {

            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

}