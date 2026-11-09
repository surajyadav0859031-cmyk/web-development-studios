"use strict";

/* =====================================================
   WEBSITE REDESIGN SERVICE PAGE
   File: website-redesign.js
   Language: JavaScript
===================================================== */


/* =====================================================
   1. DOM SELECTOR FUNCTIONS
===================================================== */

/**
 * Select a single HTML element.
 *
 * @param {string} selector
 * @param {ParentNode} [parent=document]
 * @returns {Element | null}
 */
function selectElement(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Select multiple HTML elements.
 *
 * @param {string} selector
 * @param {ParentNode} [parent=document]
 * @returns {Element[]}
 */
function selectAllElements(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}


/* =====================================================
   2. INITIALIZE WEBSITE FEATURES
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       3. MOBILE NAVIGATION
    ================================================= */

    const menuToggle = selectElement(
        "#menuToggle, .menu-toggle, .nav-toggle"
    );

    const navMenu = selectElement(
        "#navMenu, .nav-menu, .nav-links"
    );

    if (menuToggle && navMenu) {

        /**
         * Close the mobile navigation menu.
         */
        function closeMobileMenu() {
            navMenu.classList.remove("active", "open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        /**
         * Toggle the mobile navigation menu.
         */
        menuToggle.addEventListener("click", function () {

            const isExpanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            const shouldOpen = !isExpanded;

            menuToggle.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            navMenu.classList.toggle(
                "active",
                shouldOpen
            );

            navMenu.classList.toggle(
                "open",
                shouldOpen
            );

            menuToggle.classList.toggle(
                "active",
                shouldOpen
            );

        });

        /* Close the menu after clicking a navigation link. */

        selectAllElements("a", navMenu).forEach(function (link) {

            link.addEventListener("click", function () {
                closeMobileMenu();
            });

        });

        /* Close the menu when clicking outside it. */

        document.addEventListener(
            "click",
            function (/** @type {MouseEvent} */ event) {

                const target = event.target;

                if (!(target instanceof Node)) {
                    return;
                }

                const clickedInsideMenu =
                    navMenu.contains(target);

                const clickedToggle =
                    menuToggle.contains(target);

                if (!clickedInsideMenu && !clickedToggle) {
                    closeMobileMenu();
                }

            }
        );

        /* Close the menu when switching to desktop width. */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {
                closeMobileMenu();
            }

        });

    }


    /* =================================================
       4. SMOOTH SCROLLING
    ================================================= */

    selectAllElements('a[href^="#"]').forEach(function (link) {

        link.addEventListener(
            "click",
            function (/** @type {MouseEvent} */ event) {

                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                /** @type {Element | null} */
                let targetElement = null;

                try {
                    targetElement = selectElement(targetId);
                } catch {
                    return;
                }

                if (!targetElement) {
                    return;
                }

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =================================================
       5. SCROLL REVEAL ANIMATIONS
    ================================================= */

    const revealElements = selectAllElements(
        ".reveal, .fade-in, .service-card, .process-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }

        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        /* Show elements immediately in older browsers. */

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =================================================
       6. FAQ ACCORDION
    ================================================= */

    const faqButtons = selectAllElements(
        ".faq-question, .faq-toggle"
    );

    faqButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const faqItem = button.closest(
                ".faq-item, .faq-card, .accordion-item"
            );

            if (!faqItem) {
                return;
            }

            const answer = selectElement(
                ".faq-answer, .faq-content, .accordion-content",
                faqItem
            );

            if (!answer) {
                return;
            }

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            const shouldOpen = !isOpen;

            button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            faqItem.classList.toggle(
                "active",
                shouldOpen
            );

            answer.hidden = !shouldOpen;

        });

    });


    /* =================================================
       7. CONTACT FORM VALIDATION
    ================================================= */

    const contactForm = selectElement(
        "#contactForm, #redesignContactForm, .contact-form"
    );

    if (
        contactForm instanceof HTMLFormElement
    ) {

        const formMessage = selectElement(
            "#formMessage, .form-message, #formStatus"
        );

        /**
         * Display a contact form message.
         *
         * @param {string} message
         * @param {"success" | "error"} type
         */
        function showFormMessage(message, type) {

            if (!formMessage) {
                return;
            }

            formMessage.textContent = message;

            formMessage.classList.remove(
                "success",
                "error"
            );

            formMessage.classList.add(type);

            formMessage.setAttribute(
                "role",
                "status"
            );

            formMessage.setAttribute(
                "aria-live",
                "polite"
            );

        }

        /* Clear custom email validation when the user edits it. */

        const emailInput = selectElement(
            'input[type="email"], input[name="email"]',
            contactForm
        );

        if (emailInput instanceof HTMLInputElement) {

            emailInput.addEventListener("input", function () {
                emailInput.setCustomValidity("");
            });

        }

        /* Validate the form when submitted. */

        contactForm.addEventListener(
            "submit",
            function (/** @type {SubmitEvent} */ event) {

                event.preventDefault();

                /* Check required fields and HTML constraints. */

                if (!contactForm.checkValidity()) {

                    contactForm.reportValidity();

                    showFormMessage(
                        "Please complete all required fields correctly.",
                        "error"
                    );

                    return;
                }

                /* Validate the email address. */

                if (
                    emailInput instanceof HTMLInputElement &&
                    emailInput.value.trim() !== ""
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (
                        !emailPattern.test(
                            emailInput.value.trim()
                        )
                    ) {

                        emailInput.setCustomValidity(
                            "Please enter a valid email address."
                        );

                        emailInput.reportValidity();

                        emailInput.setCustomValidity("");

                        return;
                    }

                }

                /*
                 * IMPORTANT:
                 * This section validates the form only.
                 *
                 * It does not send messages to your email.
                 * Connect a backend or form service to send
                 * customer enquiries.
                 */

                showFormMessage(
                    "Your form is valid. Connect a form service or backend to send your project enquiry.",
                    "success"
                );

            }
        );

    }


    /* =================================================
       8. AUTOMATIC COPYRIGHT YEAR
    ================================================= */

    const yearElements = selectAllElements(
        "#currentYear, .current-year"
    );

    yearElements.forEach(function (element) {

        element.textContent = String(
            new Date().getFullYear()
        );

    });


    /* =================================================
       9. BACK TO TOP BUTTON
    ================================================= */

    const backToTopButton = selectElement(
        "#backToTop, .back-to-top"
    );

    if (backToTopButton) {

        /**
         * Update the back-to-top button visibility.
         */
        function updateBackToTopVisibility() {

            backToTopButton.hidden =
                window.scrollY < 300;

        }

        window.addEventListener(
            "scroll",
            updateBackToTopVisibility,
            { passive: true }
        );

        updateBackToTopVisibility();

        /* Scroll smoothly to the top of the page. */

        backToTopButton.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =================================================
       10. ACTIVE NAVIGATION LINK
    ================================================= */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    selectAllElements(
        ".nav-menu a, .nav-links a"
    ).forEach(function (link) {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:")
        ) {
            return;
        }

        let linkPage = "";

        try {

            linkPage = new URL(
                href,
                window.location.href
            ).pathname
                .split("/")
                .pop()
                .toLowerCase();

        } catch {
            return;
        }

        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.classList.remove("active");

            link.removeAttribute("aria-current");

        }

    });

});