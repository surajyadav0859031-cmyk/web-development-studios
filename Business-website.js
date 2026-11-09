"use strict";

/* =================================
   COPYRIGHT YEAR
================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =================================
   MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen
            ? "✕ Close"
            : "☰ Menu";
    });


    // Close the mobile menu after navigation.
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰ Menu";
        });

    });

}


/* =================================
   SERVICE SEARCH
================================= */

const serviceSearch = document.getElementById("serviceSearch");
const serviceCards = document.querySelectorAll(".service-card");
const searchMessage = document.getElementById("searchMessage");

if (serviceSearch && searchMessage) {

    serviceSearch.addEventListener("input", function () {

        const query = serviceSearch.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        serviceCards.forEach(function (card) {

            const searchableText = (
                card.innerText + " " +
                (card.dataset.search || "")
            ).toLowerCase();

            const matches = searchableText.includes(query);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }

        });

        searchMessage.hidden = visibleCount !== 0;

    });

}


/* =================================
   AUTOMATIC SERVICE SELECTION
================================= */

const websiteType = document.getElementById("websiteType");

document.querySelectorAll("[data-service]").forEach(function (link) {

    link.addEventListener("click", function () {

        if (!websiteType) {
            return;
        }

        const selectedService = link.dataset.service;

        const matchingOption = Array.from(
            websiteType.options
        ).find(function (option) {

            return (
                option.value === selectedService ||
                option.textContent.trim() === selectedService
            );

        });

        if (matchingOption) {
            websiteType.value = matchingOption.value;
        }

    });

});


/* =================================
   CONTACT FORM VALIDATION
================================= */

// This frontend-only form does not send or save enquiries.

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;
        }

        formMessage.textContent =
            "The form is working, but it is not connected " +
            "to a server yet. Connect a secure backend " +
            "to receive and save enquiries.";

        formMessage.style.color = "#b45309";

    });

}