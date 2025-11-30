const formNumberArray = document.querySelectorAll('[data-form-number]');

if (formNumberArray.length) {
    formNumberArray.forEach(formNumber => {
        const input = formNumber.querySelector('input');
        const increment = formNumber.querySelector('button:first-of-type');
        const decrement = formNumber.querySelector('button:last-of-type');

        increment.addEventListener('click', () => {
            input.value = Number(input.value) + 1;
        });

        decrement.addEventListener('click', () => {
            if (input.value > 0) {
                input.value = Number(input.value) - 1;
            }
        });
    });
}
