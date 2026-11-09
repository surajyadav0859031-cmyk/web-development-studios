"use strict";


/* =====================================
   1. MOBILE NAVIGATION
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");

    const navMenu = document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================
       2. FAQ ACCORDION
    ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        const icon = question.querySelector("span");


        question.setAttribute("aria-expanded", "false");


        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                const otherIcon =
                    otherQuestion.querySelector("span");

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherIcon.textContent = "+";

            });


            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                icon.textContent = "−";

            }

        });

    });


    /* =====================================
       3. CURRENT YEAR
    ===================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


});