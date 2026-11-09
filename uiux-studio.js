"use strict";

/* ========================================
   1. MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    function closeMenu() {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

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
    });

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });

    document.addEventListener("click", function (event) {

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideNav && !clickedToggle) {
            closeMenu();
        }

    });

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {
            closeMenu();
        }

    });
}


/* ========================================
   2. AUTOMATIC FOOTER YEAR
======================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ========================================
   3. BACK TO TOP
======================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ========================================
   4. SERVICE CARD SELECTION
======================================== */

const projectType = document.getElementById("projectType");

const serviceLinks = document.querySelectorAll(
    ".service-link[data-service]"
);

serviceLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const selectedService = link.dataset.service;

        if (projectType && selectedService) {

            projectType.value = selectedService;

        }

    });

});


/* ========================================
   5. PROJECT FORM
======================================== */

const projectForm = document.getElementById("uiuxProjectForm");

const formMessage = document.getElementById("formMessage");

const submitButton = projectForm
    ? projectForm.querySelector('button[type="submit"]')
    : null;

const submitText = document.getElementById("submitText");


function showFormMessage(message, type) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.className = "form-message " + type;

}


if (projectForm) {

    projectForm.addEventListener("submit", function (event) {

        event.preventDefault();

        /*
         * This is a front-end demonstration.
         * It does not send data to a server.
         */

        if (!projectForm.reportValidity()) {
            return;
        }

        const honeypot = document.getElementById("website");

        if (honeypot && honeypot.value.trim() !== "") {

            showFormMessage(
                "Unable to process this inquiry.",
                "error"
            );

            return;
        }

        const formData = new FormData(projectForm);

        const customerName = String(
            formData.get("name") || ""
        ).trim();

        const customerEmail = String(
            formData.get("email") || ""
        ).trim();

        const selectedProject = String(
            formData.get("projectType") || ""
        ).trim();

        const projectDetails = String(
            formData.get("details") || ""
        ).trim();


        if (
            !customerName ||
            !customerEmail ||
            !selectedProject ||
            !projectDetails
        ) {

            showFormMessage(
                "Please complete all required fields.",
                "error"
            );

            return;
        }


        /*
         * No network request is made here.
         * Do not display a false success message
         * claiming that a customer inquiry was sent.
         */

        showFormMessage(
            "Your information passed local validation, but this demo is not connected to a submission service. Connect a backend or form service to send your inquiry.",
            "error"
        );

    });

}