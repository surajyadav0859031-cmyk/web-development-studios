"use strict";


/* =========================================
   1. DOM SELECTORS
========================================= */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const faqItems = document.querySelectorAll(".faq-item");


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    // CLOSE MENU WHEN LINK IS CLICKED

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        });

    });


    // CLOSE MENU WHEN CLICKING OUTSIDE

    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navMenu.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        }

    });


    // CLOSE MENU WITH ESCAPE KEY

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        }

    });

}


/* =========================================
   3. FAQ ACCORDION
========================================= */

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", function () {

        const isOpen = item.classList.contains("open");


        // CLOSE OTHER FAQ ITEMS

        faqItems.forEach(function (otherItem) {

            otherItem.classList.remove("open");

            const otherButton = otherItem.querySelector(".faq-question");

            if (otherButton) {

                otherButton.setAttribute("aria-expanded", "false");

            }

        });


        // OPEN SELECTED FAQ

        if (!isOpen) {

            item.classList.add("open");

            question.setAttribute("aria-expanded", "true");

        }

    });

});


/* =========================================
   4. HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}, { passive: true });


/* =========================================
   5. SMOOTH SECTION NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/* =========================================
   6. CURRENT YEAR
========================================= */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.textContent =
        "© " + new Date().getFullYear() +
        " The Web Development Studios. All Rights Reserved.";

}


/* =========================================
   7. INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Hosting & Deployment Service Page Loaded Successfully."
    );

});