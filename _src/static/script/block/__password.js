const inputPassword = document.querySelector('[data-input-password]');

if (inputPassword) {
  const btn = inputPassword.nextElementSibling;
  btn.addEventListener('click', () => {
    inputPassword.type = inputPassword.type === 'password' ? 'text' : 'password';
  })
}
