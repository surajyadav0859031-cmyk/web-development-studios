"use strict";

/* =========================================
   THE WEB DEVELOPMENT STUDIOS
   Responsive Website Service Page
========================================= */


/* 1. MOBILE NAVIGATION MENU */

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const primaryNav = document.querySelector("#primary-nav");

    if (menuToggle && primaryNav) {
        function closeMenu() {
            primaryNav.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        menuToggle.addEventListener("click", function () {
            const isOpen =
                primaryNav.classList.toggle("is-open");

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

        // Close the menu after clicking a navigation link.
        primaryNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when the Escape key is pressed.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close the mobile menu when switching to desktop layout.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }
});


/* 2. AUTOMATIC COPYRIGHT YEAR */

document.addEventListener("DOMContentLoaded", function () {
    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }
});


/* 3. SERVICE BUTTONS */

document.addEventListener("DOMContentLoaded", function () {
    const projectType =
        document.querySelector("#project-type");

    const serviceLinks =
        document.querySelectorAll("[data-service]");

    if (!projectType || serviceLinks.length === 0) {
        return;
    }

    serviceLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const selectedService =
                link.dataset.service.toLowerCase();

            let matchingOption = null;

            // Find a matching option in the enquiry form.
            Array.from(projectType.options).forEach(
                function (option) {
                    if (
                        option.value.toLowerCase() ===
                        selectedService
                    ) {
                        matchingOption = option;
                    }
                }
            );

            // Select the appropriate project category.
            if (matchingOption) {
                projectType.value = matchingOption.value;
            } else if (selectedService.includes("redesign")) {
                projectType.value = "Website redesign";
            } else if (selectedService.includes("application")) {
                projectType.value =
                    "Responsive web application";
            } else if (selectedService.includes("landing")) {
                projectType.value = "Landing page";
            } else {
                projectType.value = "Responsive website";
            }
        });
    });
});


/* 4. PROJECT ENQUIRY FORM */

document.addEventListener("DOMContentLoaded", function () {
    const projectForm =
        document.querySelector("#project-form");

    const statusMessage =
        document.querySelector("#form-status");

    if (!projectForm || !statusMessage) {
        return;
    }

    projectForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Let the browser validate required fields and email format.
        if (!projectForm.reportValidity()) {
            return;
        }

        const formData = new FormData(projectForm);

        const customerName =
            String(formData.get("name") || "").trim();

        const customerEmail =
            String(formData.get("email") || "").trim();

        const projectCategory =
            String(
                formData.get("projectType") ||
                "Responsive website"
            );

        const projectDetails =
            String(formData.get("message") || "").trim();

        // Prevent empty values from being used.
        if (
            !customerName ||
            !customerEmail ||
            !projectDetails
        ) {
            statusMessage.textContent =
                "Please complete all required fields.";

            return;
        }

        // Replace this with your actual business email.
        const businessEmail = "hello@example.com";

        const emailSubject = encodeURIComponent(
            "New Website Enquiry - " + projectCategory
        );

        const emailBody = encodeURIComponent(
            "Website Project Enquiry\n\n" +
            "Customer Name: " + customerName + "\n" +
            "Customer Email: " + customerEmail + "\n" +
            "Project Type: " + projectCategory + "\n\n" +
            "Project Details:\n" + projectDetails
        );

        const emailLink =
            "mailto:" + businessEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        statusMessage.textContent =
            "Opening your email application with your enquiry.";

        // Open the visitor's default email application.
        window.location.href = emailLink;
    });
});


/* 5. FAQ ACCESSIBILITY */

document.addEventListener("DOMContentLoaded", function () {
    const faqItems =
        document.querySelectorAll(".faq-list details");

    faqItems.forEach(function (item) {
        item.addEventListener("toggle", function () {
            // Native HTML details elements already support
            // keyboard interaction and opening/closing.
            // This listener is available for future enhancements.
        });
    });
});


/* 6. PREVENT BROKEN INTERNAL NAVIGATION */

document.addEventListener("DOMContentLoaded", function () {
    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (!targetElement) {
                event.preventDefault();
            }
        });
    });
});


/* =========================================
   JAVASCRIPT INITIALIZATION COMPLETE
========================================= */

console.log(
    "The Web Development Studios: Responsive service page loaded successfully."
);