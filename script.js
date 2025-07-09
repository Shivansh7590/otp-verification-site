const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));
const otpInputs = document.querySelectorAll('.otp-input');
const otpForm = document.getElementById('otp-form');
const otpMessage = document.getElementById('otp-message');
let otp = generateOTP();
[...otpInputs].forEach((input, idx) => {
  input.placeholder = otp[idx];
});
otpInputs.forEach((input, idx) => {
  input.addEventListener('input', e => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    if (value && idx < otpInputs.length - 1) {
      otpInputs[idx + 1].focus();
    }});
  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !input.value && idx > 0) {
      otpInputs[idx - 1].focus();
    }});});
otpForm.addEventListener('submit', e => {
  e.preventDefault();
  const entered = [...otpInputs].map(input => input.value).join('');
  otpInputs.forEach(input => {
    input.classList.remove('valid', 'invalid');});
  if (entered.length < 4) {
    otpMessage.textContent = 'Please enter all 4 digits.';
    otpInputs.forEach(input => input.classList.add('invalid'));
    return;
  }
  if (entered === otp) {
    otpInputs.forEach(input => input.classList.add('valid'));
    otpMessage.textContent = 'Success! Your email has been verified.';
    otpMessage.style.color = '#3ecf8e';
    setTimeout(() => {
      otpMessage.textContent = '';
      otpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('valid');
      });
      otp = generateOTP();
      [...otpInputs].forEach((input, idx) => {
        input.placeholder = otp[idx];
      });
    }, 2000);
  } else {
    otpInputs.forEach(input => input.classList.add('invalid'));
    otpMessage.textContent = 'Invalid OTP';
    otpMessage.style.color = '#ff4d6d';
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}); 