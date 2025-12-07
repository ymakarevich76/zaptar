const formNumberArray = document.querySelectorAll('[data-form-number]');

if (formNumberArray.length) {
  const setValue = (input, value) => {
    input.value = value;
    input.setAttribute('value', value);
  };

  const updateTwins = (input) => {
    const formNumber = input.closest('[data-form-number]');
    if (!formNumber) return;

    const id = formNumber.dataset.formNumber;
    if (!id) return;

    const value = +input.value || 0;

    document.querySelectorAll(`[data-form-number="${id}"]`).forEach(block => {
      const twin = block.querySelector('input');
      if (!twin || twin === input) return;

      setValue(twin, value);
    });
  };

  document.addEventListener('click', e => {
    const increment = e.target.closest('[data-increment]');
    const decrement = e.target.closest('[data-decrement]');
    if (!increment && !decrement) return;

    const formNumber = e.target.closest('[data-form-number]');
    if (!formNumber) return;

    const input = formNumber.querySelector('input');
    if (!input) return;

    let value = +input.value || 0;
    if (increment) value++;
    if (decrement && value > 0) value--;

    setValue(input, value);
    updateTwins(input);
  });

  document.addEventListener('input', e => {
    const input = e.target.closest('[data-form-number] input');
    if (!input) return;

    let value = +input.value || 0;
    setValue(input, value);

    updateTwins(input);
  });
}
