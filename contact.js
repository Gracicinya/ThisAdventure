/* ================================================================
    THE SHATTERED CROWN — contact.js
    Handles the contact form on the Join page.
    Uses Vue to show and hide the form and check for errors.
================================================================ */

/* Get the createApp function from Vue (loaded via script tag in HTML) */
const { createApp } = Vue;

createApp({

  /* data() holds all the information the form needs to track */
  data() {
    return {

      /* The values the user types into each field */
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
        subscribe: true, /* newsletter checkbox is ticked by default */
      },

      /* Error messages shown under each field if the user types something wrong */
      errors: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },

      submitted: false,  /* true after the form is successfully sent */
      submitting: false, /* true while the form is being sent (shows loading state) */
    };
  },

  /* computed values are calculated automatically based on the form data above */
  computed: {

    /* Check if the name field has at least 2 characters */
    nameValid() {
      return this.form.name.trim().length >= 2;
    },

    /* Check if the email looks like a real email address */
    emailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
    },

    /* Check if the subject field has at least 2 characters */
    subjectValid() {
      return this.form.subject.trim().length >= 2;
    },

    /* Check if the message field has at least 10 characters */
    messageValid() {
      return this.form.message.trim().length >= 10;
    },

    /* The whole form is only valid if all four fields above pass */
    formValid() {
      return this.nameValid && this.emailValid && this.subjectValid && this.messageValid;
    },
  },

  /* methods are functions that run when the user does something */
  methods: {

    /* These four functions check one field each.
       They run when the user clicks away from a field (@blur in the HTML).
       If the field is wrong, they store an error message to show on screen. */

    validateName() {
      if (this.nameValid) {
        this.errors.name = ''; /* clear any old error */
      } else {
        this.errors.name = 'Name must be at least 2 characters long.';
      }
    },

    validateEmail() {
      if (this.emailValid) {
        this.errors.email = '';
      } else {
        this.errors.email = 'Please enter a valid email address.';
      }
    },

    validateSubject() {
      if (this.subjectValid) {
        this.errors.subject = '';
      } else {
        this.errors.subject = 'Subject must be at least 2 characters long.';
      }
    },

    validateMessage() {
      if (this.messageValid) {
        this.errors.message = '';
      } else {
        this.errors.message = 'Message must be at least 10 characters long.';
      }
    },

    /* Check all four fields at once and return true only if all pass */
    validateAll() {
      this.validateName();
      this.validateEmail();
      this.validateSubject();
      this.validateMessage();
      return this.formValid;
    },

    /* Runs when the user clicks Submit.
       1. Checks all fields — stops early if anything is wrong.
       2. Shows a short loading delay (pretends to send the form).
       3. Swaps the form out for a success message (submitted = true). */
    async submitForm() {

      /* Stop if any field has an error */
      if (!this.validateAll()) return;

      /* Show loading state */
      this.submitting = true;

      /* Wait 900ms to simulate sending */
      await new Promise(function(resolve) { setTimeout(resolve, 900); });

      /* Done sending */
      this.submitting = false;
      this.submitted = true;

      /* Clear the form fields back to empty */
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        subscribe: true,
      };
    },

    /* Runs when the user clicks "Send Another".
       Hides the success message and shows the form again. */
    resetForm() {
      this.submitted = false;

      /* Clear all error messages */
      this.errors = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    },

  },

/* Mount connects this Vue app to the HTML element with id="contact-form-app" */
}).mount('#contact-form-app');
