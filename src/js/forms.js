/**
 * Form Validation and Handling
 */

export function initForms() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;

  const statusMsg = document.createElement('div');
  statusMsg.className = 'form-status mt-md text-small hidden';
  contactForm.appendChild(statusMsg);

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Reset status
    statusMsg.classList.add('hidden');
    statusMsg.textContent = '';
    
    // Simple validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('border-red-500');
        
        // Add error message if not exists
        let errorSpan = input.parentNode.querySelector('.error-msg');
        if (!errorSpan) {
          errorSpan = document.createElement('span');
          errorSpan.className = 'error-msg text-xs text-red-500 mt-xs block';
          errorSpan.textContent = 'This field is required';
          input.parentNode.appendChild(errorSpan);
        }
      } else {
        input.classList.remove('border-red-500');
        const errorSpan = input.parentNode.querySelector('.error-msg');
        if (errorSpan) errorSpan.remove();

        // Email validation
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            input.classList.add('border-red-500');
            let errorSpan = input.parentNode.querySelector('.error-msg');
            if (!errorSpan) {
              errorSpan = document.createElement('span');
              errorSpan.className = 'error-msg text-xs text-red-500 mt-xs block';
              errorSpan.textContent = 'Please enter a valid email address';
              input.parentNode.appendChild(errorSpan);
            }
          }
        }
      }
    });

    if (!isValid) return;

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="flex-center gap-sm"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
      statusMsg.className = 'form-status mt-md text-small text-green-600';
      statusMsg.classList.remove('hidden');
      
      contactForm.reset();
      
      setTimeout(() => {
        statusMsg.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 5000);
    } catch (error) {
      statusMsg.textContent = 'Something went wrong. Please try again later.';
      statusMsg.className = 'form-status mt-md text-small text-red-600';
      statusMsg.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  // Clear errors on input
  contactForm.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('border-red-500');
      const errorSpan = input.parentNode.querySelector('.error-msg');
      if (errorSpan) errorSpan.remove();
    });
  });
}
