const checkMain = document.querySelector('[data-checkbox-main]');

if (checkMain) {
    const checks = document.querySelectorAll('[data-checkbox]');
    const checkActions = document.querySelectorAll('[data-checked-product]');
    const blockNotProduct = document.querySelector('[data-not-checked-product]');
    const orders = document.querySelectorAll('[data-order]');

    const calculateAmount = () => {
      // Распарсить сумму с пробелами и запятой
      const parseAmount = str => Number(str.replace(/\s/g, '').replace(',', '.').trim());
      let sum = 0;
      let count = 0;

      orders.forEach(order => {
        const check = order.querySelector('[data-checkbox]');
        if (!check.checked) return;

        const amount = parseAmount(order.querySelector('[data-order-amount]').textContent);

        if (!isNaN(amount)) {
          sum += amount;
          count++;
        }
      });

      document.querySelector('[data-order-total]').textContent = String(sum.toFixed(2));
      document.querySelector('[data-order-count]').textContent = String(count);

      if (count > 0) {
        checkActions.forEach(block => block.classList.remove('d-none'));
        blockNotProduct.classList.add('d-none');
      } else {
        checkActions.forEach(block => block.classList.add('d-none'));
        blockNotProduct.classList.remove('d-none');
      }
    };

    checkMain.addEventListener('change', () => {
        checks.forEach(check => {
            check.checked = checkMain.checked;
            calculateAmount();
        });
    });

    checks.forEach(check => {
        check.addEventListener('change', () => {
            checkMain.checked = [...checks].every(item => item.checked);
            calculateAmount();
        });
    });
}
