/* ================================================================
    THE SHATTERED CROWN — contact.js
    Vue application for contact page interactivity.
    Handles: contact form validation and submission.
    Note: FAQ accordion and countdown are handled by main.js.
   ================================================================ */

const { createApp } = Vue;

createApp({

    /* Data */
    data() {
        return {

            form: {
                name: '',
                email: '',
                subject: '',
                message: '',
                subscribe: true
            },
            
            /*Validation error messages*/
            errors: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },

            submitted: false,
            submitting: false,



        };
    },

    computed: {
        nameValid() {return this.form.name.trim().length >= 2;},
        emailValid() {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);},
        subjectValid() {return this.form.subject.trim().length >= 2;},
        messageValid() {return this.form.message.trim().length >= 10;},

        formValid() {
            return this.nameValid && this.emailValid && this.subjectValid && this.messageValid;
        }
    },

    methods: {

        /* ── FIELD VALIDATION ──────────────────────────────────
        Each method is triggered by @blur (when the user leaves
        a field) so errors only appear after they finish typing. */

        validateName() {
            this.errors.name = this.nameValid 
                ? '' 
                : 'Name must be at least 2 characters long.';
        },
        validateEmail() {
            this.errors.email = this.emailValid 
                ? '' 
                : 'Please enter a valid email address.';
        },
        validateSubject() {
            this.errors.subject = this.subjectValid 
                ? '' 
                : 'Subject must be at least 2 characters long.';
        },
        validateMessage() {
            this.errors.message = this.messageValid 
                ? '' 
                : 'Message must be at least 10 characters long.';
        },

        validateAll() {
            this.validateName();
            this.validateEmail();
            this.validateSubject();
            this.validateMessage();
            return this.formValid;
        },

        /* ── FORM SUBMIT ───────────────────────────────────────
        Validates all fields first. Shows the success
        state by setting submitted = true, which triggers Vue's
        v-if to swap the form for the success message.*/
        async submitForm() {
            if (!this.validateAll()) return;

            this.submitting = true;
            await new Promise(resolve => setTimeout(resolve, 900));
            this.submitting = false;
            this.submitted  = true;

            this.form = { name: '', email: '', subject: '', message: '', subscribe: true };
        },

        resetForm() {
            this.submitted = false;
            this.errors    = { name: '', email: '', subject: '', message: '' };
        }
    },


}).mount('#contact-form-app');

/* ================================================================
    THE SHATTERED CROWN — contact.js
    Vue application for contact page interactivity.
    Handles: contact form validation and submission.
    Note: FAQ accordion and countdown are handled by main.js.
   ================================================================ */

const { createApp } = Vue;

createApp({

    /* Data */
    data() {
        return {

            form: {
                name: '',
                email: '',
                subject: '',
                message: '',
                subscribe: true
            },
            
            /*Validation error messages*/
            errors: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },

            submitted: false,
            submitting: false,



        };
    },

    computed: {
        nameValid() {return this.form.name.trim().length >= 2;},
        emailValid() {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);},
        subjectValid() {return this.form.subject.trim().length >= 2;},
        messageValid() {return this.form.message.trim().length >= 10;},

        formValid() {
            return this.nameValid && this.emailValid && this.subjectValid && this.messageValid;
        }
    },

    methods: {

        /* ── FIELD VALIDATION ──────────────────────────────────
        Each method is triggered by @blur (when the user leaves
        a field) so errors only appear after they finish typing. */

        validateName() {
            this.errors.name = this.nameValid 
                ? '' 
                : 'Name must be at least 2 characters long.';
        },
        validateEmail() {
            this.errors.email = this.emailValid 
                ? '' 
                : 'Please enter a valid email address.';
        },
        validateSubject() {
            this.errors.subject = this.subjectValid 
                ? '' 
                : 'Subject must be at least 2 characters long.';
        },
        validateMessage() {
            this.errors.message = this.messageValid 
                ? '' 
                : 'Message must be at least 10 characters long.';
        },

        validateAll() {
            this.validateName();
            this.validateEmail();
            this.validateSubject();
            this.validateMessage();
            return this.formValid;
        },

        /* ── FORM SUBMIT ───────────────────────────────────────
        Validates all fields first. Shows the success
        state by setting submitted = true, which triggers Vue's
        v-if to swap the form for the success message.*/
        async submitForm() {
            if (!this.validateAll()) return;

            this.submitting = true;
            await new Promise(resolve => setTimeout(resolve, 900));
            this.submitting = false;
            this.submitted  = true;

            this.form = { name: '', email: '', subject: '', message: '', subscribe: true };
        },

        resetForm() {
            this.submitted = false;
            this.errors    = { name: '', email: '', subject: '', message: '' };
        }
    },


}).mount('#contact-form-app');
