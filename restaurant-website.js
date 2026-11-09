"use strict";

/* =========================================
   PART 1: MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    function selectElement(selector, parent = document) {
        return parent.querySelector(selector);
    }

    const menuToggle = selectElement("#menuToggle");
    const navMenu = selectElement("#navMenu");

    function closeMenu() {
        if (!menuToggle || !navMenu) {
            return;
        }

        menuToggle.classList.remove("is-open");
        navMenu.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("is-open");

            menuToggle.classList.toggle("is-open", isOpen);

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

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        });

        // Close the menu after clicking a navigation link.
        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });

        // Close the menu using the Escape key.
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close the mobile menu when returning to desktop width.
        window.addEventListener("resize", function () {

            if (window.innerWidth > 720) {
                closeMenu();
            }

        });
    }
      /* =========================================
       PART 2: FOOTER YEAR
    ========================================= */

    const yearElement = selectElement("#currentYear");

    if (yearElement) {

        yearElement.textContent =
            String(new Date().getFullYear());

    }


    /* =========================================
       PART 2: PRICING PACKAGE SELECTION
    ========================================= */

    const packageSelect = selectElement("#websitePackage");

    const packageLinks = document.querySelectorAll(
        "[data-package]"
    );

    packageLinks.forEach(function (packageLink) {

        packageLink.addEventListener("click", function () {

            if (!packageSelect) {
                return;
            }

            const selectedPackage =
                packageLink.dataset.package;

            if (selectedPackage) {

                packageSelect.value = selectedPackage;

            }

        });

    });


    /* =========================================
       PART 2: CONTACT FORM ELEMENTS
    ========================================= */

    const contactForm = selectElement(
        "#restaurantContactForm"
    );

    const formStatus = selectElement("#formStatus");

    function setStatus(message, isError = false) {

        if (!formStatus) {
            return;
        }

        formStatus.textContent = message;

        formStatus.classList.toggle(
            "error",
            isError
        );

    }
      /* =========================================
       PART 3: CONTACT FORM VALIDATION
    ========================================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                // Prevent the browser's default form submission.
                event.preventDefault();

                // Check required fields and input formats.
                if (!contactForm.checkValidity()) {

                    contactForm.reportValidity();

                    setStatus(
                        "Please complete all required fields correctly.",
                        true
                    );

                    return;
                }


                /* =====================================
                   SPAM PROTECTION: HONEYPOT FIELD
                ===================================== */

                const honeypot = selectElement(
                    "#websiteAddress",
                    contactForm
                );

                if (
                    honeypot &&
                    honeypot.value.trim() !== ""
                ) {

                    setStatus(
                        "Your inquiry could not be processed. Please try again.",
                        true
                    );

                    return;
                }


                /* =====================================
                   READ FORM DATA
                ===================================== */

                const formData = new FormData(contactForm);

                const name = String(
                    formData.get("name") || ""
                ).trim();

                const business = String(
                    formData.get("business") || ""
                ).trim();

                const email = String(
                    formData.get("email") || ""
                ).trim();

                const phone = String(
                    formData.get("phone") || ""
                ).trim();

                const restaurantType = String(
                    formData.get("restaurantType") || ""
                ).trim();

                const packageChoice = String(
                    formData.get("package") || "Not decided yet"
                ).trim();

                const message = String(
                    formData.get("message") || ""
                ).trim();


                /* =====================================
                   CHECK REQUIRED DATA
                ===================================== */

                if (
                    !name ||
                    !business ||
                    !email ||
                    !restaurantType ||
                    !message
                ) {

                    setStatus(
                        "Please fill in all required fields.",
                        true
                    );

                    return;
                }
                              /* =========================================
                   PART 4: CREATE EMAIL CONTENT
                ========================================= */

                const subject =
                    "Restaurant Website Project Inquiry - " +
                    business;

                const body = [

                    "RESTAURANT WEBSITE PROJECT INQUIRY",

                    "",

                    "Customer Name: " + name,

                    "Restaurant Name: " + business,

                    "Email Address: " + email,

                    "Phone Number: " +
                        (phone || "Not provided"),

                    "Restaurant Type: " + restaurantType,

                    "Preferred Package: " +
                        (packageChoice || "Not decided yet"),

                    "",

                    "PROJECT REQUIREMENTS",

                    message

                ].join("\n");


                /* =========================================
                   CONFIGURE YOUR BUSINESS EMAIL
                ========================================= */

                // Replace this with your actual business email.
                const studioEmail = "your-email@example.com";


                if (
                    !studioEmail ||
                    studioEmail === "your-email@example.com"
                ) {

                    setStatus(
                        "The form is working. Please configure your business email in restaurant-website.js before using it."
                    );

                    return;
                }


                /* =========================================
                   OPEN EMAIL APPLICATION
                ========================================= */

                const mailtoURL =
                    "mailto:" + studioEmail +
                    "?subject=" + encodeURIComponent(subject) +
                    "&body=" + encodeURIComponent(body);


                setStatus(
                    "Opening your email application. Review the inquiry and press Send."
                );

                window.location.href = mailtoURL;

            }
        );

    }

});