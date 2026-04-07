function initHomeCountdown() {
  const launchDate = new Date('2026-12-01T09:00:00').getTime();
  const launchDateEl = document.getElementById('launch-date');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!launchDateEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  launchDateEl.textContent = new Date(launchDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  function updateCountdown() {
    const distance = launchDate - Date.now();

    if (distance <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours);
    minutesEl.textContent = String(minutes);
    secondsEl.textContent = String(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

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
  initHomeCountdown();
  attachEmailForm('hero-email-form', 'hero-email', 'hero-form-msg');
  attachEmailForm('mailing-form', 'mailing-email', 'mailing-form-msg');
});
