"use strict";

/* =====================================================
   THE WEB DEVELOPMENT STUDIOS
   WEBSITE DEVELOPMENT SERVICE PAGE
   ===================================================== */

/**
 * Find one element.
 * @param {string} selector
 * @param {ParentNode} [parent]
 * @returns {Element | null}
 */
function selectElement(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Find multiple elements.
 * @param {string} selector
 * @param {ParentNode} [parent]
 * @returns {Element[]}
 */
function selectAllElements(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

/**
 * Check whether a value is an HTML element.
 * @param {unknown} value
 * @returns {value is HTMLElement}
 */
function isHTMLElement(value) {
    return value instanceof HTMLElement;
}

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. MOBILE NAVIGATION
       Required HTML:
       .menu-toggle
       .nav-menu
       .nav-link
       ================================================= */

    const menuToggle = selectElement(".menu-toggle");
    const navMenu = selectElement(".nav-menu");

    const navLinks = selectAllElements(".nav-link");

    if (
        isHTMLElement(menuToggle) &&
        isHTMLElement(navMenu)
    ) {
        /**
         * Open the navigation menu.
         * @returns {void}
         */
        function openMenu() {
            navMenu.classList.add("is-open");
            menuToggle.classList.add("is-active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        }

        /**
         * Close the navigation menu.
         * @returns {void}
         */
        function closeMenu() {
            navMenu.classList.remove("is-open");
            menuToggle.classList.remove("is-active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        menuToggle.addEventListener("click", function () {
            if (navMenu.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
            });
        });

        document.addEventListener("click", function (event) {
            if (!(event.target instanceof Node)) {
                return;
            }

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }

    /* =================================================
       2. ACTIVE NAVIGATION LINK
       ================================================= */

    const sections = selectAllElements("main section[id]");

    /**
     * Update the active navigation link.
     * @returns {void}
     */
    function updateActiveNavigation() {
        let currentSection = "";

        const scrollPosition = window.scrollY + 150;

        sections.forEach(function (section) {
            if (!isHTMLElement(section)) {
                return;
            }

            const sectionTop = section.offsetTop;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener(
            "scroll",
            updateActiveNavigation,
            { passive: true }
        );

        updateActiveNavigation();
    }
    /* =================================================
       3. FAQ ACCORDION
       Required classes:
       .faq-item
       .faq-question
       .faq-answer
       .faq-icon (optional)
       ================================================= */

    const faqItems = selectAllElements(".faq-item");

    faqItems.forEach(function (item, index) {
        const question = selectElement(
            ".faq-question",
            item
        );

        const answer = selectElement(
            ".faq-answer",
            item
        );

        const icon = selectElement(
            ".faq-icon",
            item
        );

        if (
            !isHTMLElement(item) ||
            !isHTMLElement(question) ||
            !isHTMLElement(answer)
        ) {
            return;
        }

        if (!answer.id) {
            answer.id = "faq-answer-" + (index + 1);
        }

        question.setAttribute("aria-controls", answer.id);

        const initiallyOpen =
            item.classList.contains("is-open");

        question.setAttribute(
            "aria-expanded",
            String(initiallyOpen)
        );

        answer.hidden = !initiallyOpen;

        if (icon) {
            icon.textContent = initiallyOpen ? "−" : "+";
        }

        question.addEventListener("click", function () {
            const wasOpen =
                item.classList.contains("is-open");

            faqItems.forEach(function (otherItem) {
                const otherQuestion = selectElement(
                    ".faq-question",
                    otherItem
                );

                const otherAnswer = selectElement(
                    ".faq-answer",
                    otherItem
                );

                const otherIcon = selectElement(
                    ".faq-icon",
                    otherItem
                );

                otherItem.classList.remove("is-open");

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.hidden = true;
                }

                if (otherIcon) {
                    otherIcon.textContent = "+";
                }
            });

            if (!wasOpen) {
                item.classList.add("is-open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.hidden = false;

                if (icon) {
                    icon.textContent = "−";
                }
            }
        });
    });

    /* =================================================
       4. CONTACT FORM
       Required form ID: contactForm
       ================================================= */

    const contactForm = selectElement("#contactForm");

    if (
        contactForm instanceof HTMLFormElement
    ) {
        (
            'button[type="submit"], input[type="submit"]',
            contactForm
        );

        const formStatus = selectElement(
            ".form-status",
            contactForm
        );

        /**
         * Display a form status message.
         * @param {string} message
         * @param {"success" | "error" | "info"} type
         * @returns {void}
         */
        function showFormStatus(message, type) {
            if (!isHTMLElement(formStatus)) {
                return;
            }

            formStatus.textContent = message;

            formStatus.classList.remove(
                "status-error",
                "status-info",
                "status-success"
            );

            formStatus.classList.add("status-" + type);

            formStatus.setAttribute("role", "status");
            formStatus.setAttribute("aria-live", "polite");
        }

        /**
         * Display a field validation error.
         * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input
         * @param {string} errorId
         * @param {string} message
         * @returns {void}
         */
        function showError(input, errorId, message) {
            const errorElement =
                document.getElementById(errorId);

            input.setAttribute("aria-invalid", "true");

            if (isHTMLElement(errorElement)) {
                errorElement.textContent = message;
            }
        }

        /**
         * Clear a field validation error.
         * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input
         * @param {string} errorId
         * @returns {void}
         */
        function clearError(input, errorId) {
            const errorElement =
                document.getElementById(errorId);

            input.removeAttribute("aria-invalid");

            if (isHTMLElement(errorElement)) {
                errorElement.textContent = "";
            }
        }

        /**
         * Validate a form field.
         * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input
         * @returns {boolean}
         */
        function validateField(input) {
            if (!input.name) {
                return true;
            }

            const errorId = input.name + "Error";

            const value = input.value.trim();

            let message = "";

            if (input.required && value === "") {
                message = "This field is required.";
            } else if (
                input instanceof HTMLInputElement &&
                input.type === "email" &&
                value !== "" &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ) {
                message = "Enter a valid email address.";
            } else if (
                input instanceof HTMLInputElement &&
                input.type === "tel" &&
                value !== "" &&
                !/^[+()\d\s.-]{7,25}$/.test(value)
            ) {
                message = "Enter a valid phone number.";
            } else if (
                input.minLength > 0 &&
                value.length > 0 &&
                value.length < input.minLength
            ) {
                message =
                    "Please enter at least " +
                    input.minLength +
                    " characters.";
            }

            if (message) {
                showError(input, errorId, message);
                return false;
            }

            clearError(input, errorId);

            return true;
        }        /* =================================================
           5. FIELD VALIDATION EVENTS
           ================================================= */

        const formFields = selectAllElements(
            "input:not([type='hidden']):not([type='submit']):not([type='button']), select, textarea",
            contactForm
        ).filter(function (element) {
            return (
                element instanceof HTMLInputElement ||
                element instanceof HTMLSelectElement ||
                element instanceof HTMLTextAreaElement
            );
        });

        formFields.forEach(function (field) {
            field.addEventListener("blur", function () {
                validateField(field);
            });

            field.addEventListener("input", function () {
                if (field.hasAttribute("aria-invalid")) {
                    validateField(field);
                }
            });

            field.addEventListener("change", function () {
                if (field.hasAttribute("aria-invalid")) {
                    validateField(field);
                }
            });
        });

        /* =================================================
           6. FORM SUBMISSION
           ================================================= */

        contactForm.addEventListener(
            "submit",
            async function (event) {
                event.preventDefault();

                const honeypot = selectElement(
                    'input[name="_gotcha"], input[name="website_url"]',
                    contactForm
                );

                if (
                    honeypot instanceof HTMLInputElement &&
                    honeypot.value.trim() !== ""
                ) {
                    showFormStatus(
                        "Your request could not be processed.",
                        "error"
                    );

                    return;
                }

                let formIsValid = true;

                /** @type {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null} */
                let firstInvalidField = null;

                formFields.forEach(function (field) {
                    const valid = validateField(field);

                    if (!valid) {
                        formIsValid = false;

                        if (!firstInvalidField) {
                            firstInvalidField = field;
                        }
                    }
                });

                if (!formIsValid) {
                    showFormStatus(
                        "Please correct the highlighted fields.",
                        "error"
                    );

                    if (firstInvalidField) {
                        firstInvalidField.focus();
                    }

                    return;
                }

                if (!contactForm.checkValidity()) {
                    contactForm.reportValidity();

                    showFormStatus(
                        "Please complete the form correctly.",
                        "error"
                    );

                    return;
                }

                /*
                 * No email service or backend is configured here.
                 * Therefore, do not pretend that a message was sent.
                 */

                showFormStatus(
                    "Your details are valid. Connect a form service or backend to send your enquiry.",
                    "info"
                );
            }
        );

        /* =================================================
           7. RESET FORM
           ================================================= */

        contactForm.addEventListener("reset", function () {
            window.setTimeout(function () {
                formFields.forEach(function (field) {
                    clearError(
                        field,
                        field.name + "Error"
                    );
                });

                if (isHTMLElement(formStatus)) {
                    formStatus.textContent = "";

                    formStatus.classList.remove(
                        "status-error",
                        "status-info",
                        "status-success"
                    );
                }
            }, 0);
        });
    }
});