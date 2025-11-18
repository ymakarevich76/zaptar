const checkMain = document.querySelector('[data-checkbox-main]');

if (checkMain) {
    const checks = document.querySelectorAll('[data-checkbox]');

    checkMain.addEventListener('change', () => {
        checks.forEach(c => c.checked = checkMain.checked);
    });

    checks.forEach(check => {
        check.addEventListener('change', () => {
            checkMain.checked = [...checks].every(item => item.checked);
        });
    });
}
