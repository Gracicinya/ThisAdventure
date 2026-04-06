const { createApp } = Vue;

createApp({
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
        subscribe: true,
      },
      errors: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      submitted: false,
      submitting: false,
    };
  },

  computed: {
    nameValid() {
      return this.form.name.trim().length >= 2;
    },
    emailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
    },
    subjectValid() {
      return this.form.subject.trim().length >= 2;
    },
    messageValid() {
      return this.form.message.trim().length >= 10;
    },
    formValid() {
      return this.nameValid && this.emailValid && this.subjectValid && this.messageValid;
    },
  },

  methods: {
    validateName() {
      this.errors.name = this.nameValid ? '' : 'Name must be at least 2 characters long.';
    },
    validateEmail() {
      this.errors.email = this.emailValid ? '' : 'Please enter a valid email address.';
    },
    validateSubject() {
      this.errors.subject = this.subjectValid ? '' : 'Subject must be at least 2 characters long.';
    },
    validateMessage() {
      this.errors.message = this.messageValid ? '' : 'Message must be at least 10 characters long.';
    },
    validateAll() {
      this.validateName();
      this.validateEmail();
      this.validateSubject();
      this.validateMessage();
      return this.formValid;
    },
    async submitForm() {
      if (!this.validateAll()) return;

      this.submitting = true;
      await new Promise((resolve) => setTimeout(resolve, 900));
      this.submitting = false;
      this.submitted = true;
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        subscribe: true,
      };
    },
    resetForm() {
      this.submitted = false;
      this.errors = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    },
  },
}).mount('#contact-form-app');
