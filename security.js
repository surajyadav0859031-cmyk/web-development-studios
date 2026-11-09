"use strict";


/* =====================================
   1. DOM ELEMENTS
===================================== */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const faqItems = document.querySelectorAll(".faq-item");

const currentYear = document.getElementById("currentYear");


/* =====================================
   2. MOBILE NAVIGATION
===================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Close menu after clicking a link

    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", function (event) {

        if (
            !menuToggle.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =====================================
   3. FAQ ACCORDION
===================================== */

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", function () {

        const isActive = item.classList.contains("active");

        // Close other questions

        faqItems.forEach(function (faq) {

            faq.classList.remove("active");

        });

        // Toggle selected question

        if (!isActive) {

            item.classList.add("active");

        }

    });

});


/* =====================================
   4. CURRENT YEAR
===================================== */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =====================================
   5. SMOOTH SCROLL
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =====================================
   6. SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(
    ".service-card, .process-card, .industry-card, .benefit-item"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observerInstance.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

}