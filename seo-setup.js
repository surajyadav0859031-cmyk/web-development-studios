"use strict";


/* =================================
   SEO SERVICE PAGE JAVASCRIPT
================================= */


/* MOBILE NAVIGATION */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* AUTOMATIC COPYRIGHT YEAR */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* SCROLL ANIMATION */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .process-card, .benefits div"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    animatedElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

}
