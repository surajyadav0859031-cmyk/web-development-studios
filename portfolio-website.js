"use strict";

/* =========================================
   THE WEB DEVELOPMENT STUDIOS
   PORTFOLIO WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   1. SELECT ELEMENTS
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

function closeMobileMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


function toggleMobileMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    const isOpen =
        navMenu.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* =========================================
   3. CLOSE MENU AFTER CLICK
========================================= */

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        closeMobileMenu();

    });

});


/* CLOSE MENU WHEN CLICKING OUTSIDE */

document.addEventListener(
    "click",
    function(event) {

        if (!menuToggle || !navMenu) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================
   4. CLOSE MENU WITH ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================
   5. ACTIVE NAVIGATION
========================================= */

function updateActiveNavigation() {

    const currentHash =
        window.location.hash || "#top";

    navLinks.forEach(function(link) {

        const linkHash =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkHash === currentHash
        );

    });

}


window.addEventListener(
    "hashchange",
    updateActiveNavigation
);


/* =========================================
   6. CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   7. PACKAGE SELECTION
========================================= */

const packageButtons =
    document.querySelectorAll(
        "[data-package]"
    );

const budgetSelect = 
    document.getElementById("budget");

const projectDetails =
    document.getElementById("projectDetails");

const contactSection =
    document.getElementById("contact");


packageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedPackage =
            button.dataset.package;

        if (projectDetails) {

            projectDetails.value =
                "I am interested in the " +
                selectedPackage +
                " package.\n\nMy requirements: ";

        }

        if (contactSection) {

            setTimeout(function() {

                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    });

});
/* =========================================
   8. CONTACT FORM
========================================= */

const projectForm =
    document.getElementById("projectForm");

const submitButton =
    document.getElementById("submitButton");

const formStatus =
    document.getElementById("formStatus");


/* FORM INPUTS */

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const businessName =
    document.getElementById("businessName");

const service =
    document.getElementById("service");

const projectDetailsInput =
    document.getElementById("projectDetails");

const websiteField =
    document.getElementById("website");


/* ERROR ELEMENTS */

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const serviceError =
    document.getElementById("serviceError");

const detailsError =
    document.getElementById("detailsError");


/* =========================================
   9. SHOW FIELD ERROR
========================================= */

function showError(element, message) {

    if (element) {

        element.textContent = message;

    }

}


/* =========================================
   10. CLEAR FORM ERRORS
========================================= */

function clearFormErrors() {

    showError(nameError, "");

    showError(emailError, "");

    showError(serviceError, "");

    showError(detailsError, "");

    if (formStatus) {

        formStatus.textContent = "";

        formStatus.className = "form-status";

    }

}


/* =========================================
   11. VALIDATE EMAIL
========================================= */

function isValidEmail(value) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(value);

}


/* =========================================
   12. VALIDATE FORM
========================================= */

function validateProjectForm() {

    clearFormErrors();

    let isValid = true;


    /* NAME VALIDATION */

    if (!fullName.value.trim()) {

        showError(
            nameError,
            "Please enter your full name."
        );

        isValid = false;

    }


    /* EMAIL VALIDATION */

    if (!email.value.trim()) {

        showError(
            emailError,
            "Please enter your email address."
        );

        isValid = false;

    }

    else if (!isValidEmail(email.value.trim())) {

        showError(
            emailError,
            "Please enter a valid email address."
        );

        isValid = false;

    }


    /* SERVICE VALIDATION */

    if (!service.value) {

        showError(
            serviceError,
            "Please select a portfolio type."
        );

        isValid = false;

    }


    /* PROJECT DETAILS VALIDATION */

    if (
        !projectDetailsInput.value.trim()
    ) {

        showError(
            detailsError,
            "Please describe your project."
        );

        isValid = false;

    }


    return isValid;

}


/* =========================================
   13. DISPLAY FORM STATUS
========================================= */

function displayFormStatus(message, type) {

    if (!formStatus) {
        return;
    }

    formStatus.textContent = message;

    formStatus.className =
        "form-status " + type;

}


/* =========================================
   14. CONTACT FORM SUBMISSION
========================================= */

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            clearFormErrors();


            /* HONEYPOT CHECK */

            if (
                websiteField &&
                websiteField.value.trim() !== ""
            ) {

                displayFormStatus(
                    "Unable to process this submission.",
                    "error"
                );

                return;

            }


            /* VALIDATION */

            if (!validateProjectForm()) {

                displayFormStatus(
                    "Please correct the highlighted fields.",
                    "error"
                );

                return;

            }


            /*
               IMPORTANT:

               This form currently validates information
               in the browser only.

               It does not send messages to your email
               or database until a backend or form
               service is connected.
            */


            const formData = {

                fullName:
                    fullName.value.trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim(),

                businessName:
                    businessName.value.trim(),

                service:
                    service.value,

                budget:
                    budgetSelect.value,

                projectDetails:
                    projectDetailsInput.value.trim()

            };


            console.log(
                "Validated portfolio enquiry:",
                formData
            );


            displayFormStatus(
                "Validation successful. Connect a form service or backend to receive this enquiry.",
                "success"
            );

        }

    );

}


/* =========================================
   15. CLEAR ERRORS WHILE TYPING
========================================= */

if (fullName) {

    fullName.addEventListener(
        "input",
        function() {

            showError(nameError, "");

        }
    );

}


if (email) {

    email.addEventListener(
        "input",
        function() {

            showError(emailError, "");

        }
    );

}


if (service) {

    service.addEventListener(
        "change",
        function() {

            showError(serviceError, "");

        }
    );

}


if (projectDetailsInput) {

    projectDetailsInput.addEventListener(
        "input",
        function() {

            showError(detailsError, "");

        }
    );

}


/* =========================================
   16. INITIALIZE PAGE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateActiveNavigation();

        closeMobileMenu();

        console.log(
            "Portfolio Website Service Page Initialized Successfully."
        );

    }
);