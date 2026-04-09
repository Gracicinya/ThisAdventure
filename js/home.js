function attachEmailForm(formId, inputId, messageId) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const message = document.getElementById(messageId);

  if (!form || !input || !message) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!emailRe.test(value)) {
      message.textContent = 'Please enter a valid email address.';
      message.className = 'form-msg form-msg-error';
      return;
    }

    message.textContent = 'You are on the list. The forest will remember.';
    message.className = 'form-msg form-msg-success';
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachEmailForm('newsletter-form', 'newsletter-email', 'newsletter-form-msg');
});
