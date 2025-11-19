const recharge = document.querySelector('[data-recharge]');
const deduce = document.querySelector('[data-deduce]');

const removeDisabledFromBlock = (input, btnReset, btnSubmit) => {
  input.focus();
  btnReset.classList.remove('btn-primary--disabled');
  btnSubmit.classList.remove('btn--disabled');
}

const addDisabledToBlock = (input, btnReset, btnSubmit) => {
  input.value = '';
  btnReset.classList.add('btn-primary--disabled');
  btnSubmit.classList.add('btn--disabled');
}

if (recharge) {
  const items = [...recharge.querySelectorAll('[data-select-value]')];
  const inputWrapper = recharge.querySelector('[data-input-tail]');
  const input = recharge.querySelector('[data-input-tail] input');
  const btnReset = recharge.querySelector('[data-recharge-reset]');
  const btnSubmit = recharge.querySelector('[data-recharge-submit]');

  items.forEach(i => {
    i.addEventListener('click', () => {
      if (i.classList.contains('select__item--selected')) {
        inputWrapper.classList.remove('form-input-tail--disabled');
        removeDisabledFromBlock(input, btnReset, btnSubmit);
      }
    })
  });

  btnReset.addEventListener('click', () => {
    items.forEach(i => {
        if (i.classList.contains('select__item--selected')) {
          i.classList.remove('select__item--selected');
          inputWrapper.classList.add('form-input-tail--disabled');
          addDisabledToBlock(input, btnReset, btnSubmit)
        }
    });
  })
}

if (deduce) {
  const inputWrapper = deduce.querySelector('[data-input-tail]');
  const input = deduce.querySelector('[data-input-tail] input');
  const btnReset = deduce.querySelector('[data-deduce-reset]');
  const btnSubmit = deduce.querySelector('[data-deduce-submit]');

  input.addEventListener('input', () => {
    removeDisabledFromBlock(input, btnReset, btnSubmit);
  })

  btnReset.addEventListener('click', () => {
    addDisabledToBlock(input, btnReset, btnSubmit)
  })
}
