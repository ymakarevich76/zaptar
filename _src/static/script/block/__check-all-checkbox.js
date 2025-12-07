const checksMain = document.querySelectorAll('[data-checkbox-main]');

if (checksMain.length) {
  checksMain.forEach(checkMain => {
    const checks = document.querySelectorAll('[data-checkbox]');
    const checkProducts = document.querySelectorAll('[data-checked-product]');
    const checkNotProducts = document.querySelector('[data-not-checked-product]');
    const orders = document.querySelectorAll('[data-order]');
    const bar = document.querySelector('[data-action-bar]');

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
        checkProducts.forEach(block => block.classList.remove('d-none'));
        checkNotProducts.classList.add('d-none');
      } else {
        checkProducts.forEach(block => block.classList.add('d-none'));
        checkNotProducts.classList.remove('d-none');
      }
    };

    const updateBar = () => {
      const anyChecked = [...checks].some(check => check.checked);
      bar.classList.toggle('action-bar--is-visible', anyChecked);
    };

    checkMain.addEventListener('change', () => {
      checks.forEach(check => check.checked = checkMain.checked);
      updateBar();
      calculateAmount();
    });

    checks.forEach(check => {
      check.addEventListener('change', () => {
        checkMain.checked = [...checks].every(c => c.checked);
        updateBar();
        calculateAmount();
      });
    });
  })
}
