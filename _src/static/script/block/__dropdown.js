const createPopperFn = Popper && Popper.createPopper ? Popper.createPopper : null;
if (!createPopperFn) {
  console.error('Popper not found');
}
const dropdownButtons = document.querySelectorAll('[data-dropdown-btn]');
if(dropdownButtons.length) {
  dropdownButtons.forEach(btn => {
    const id = btn.dataset.dropdownBtn;
    const dropdown = document.querySelector(`[data-dropdown="${id}"]`);

    let popperInstance = null;

    function initPopper() {
      if (popperInstance) return;
      popperInstance = createPopperFn(btn, dropdown, {
        placement: 'bottom-end',
      });
    }

    function show() {
      initPopper();
      dropdown.classList.add('dropdown--visible');
      popperInstance.update();
    }

    function hide() {
      dropdown.classList.remove('dropdown--visible');
    }

    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!popperInstance) {
        initPopper();
      }
      if (dropdown.classList.contains('dropdown--visible')) {
        hide();
        return;
      }
      show();
    });

    // закроем при клике вне
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) hide();
    });

    // обновлять при scroll/resize и при скролле кастомного контейнера
    const container = btn.closest('[data-table-scrollbar]') || window;
    const onScrollResize = () => { if (popperInstance) popperInstance.update(); };
    window.addEventListener('resize', onScrollResize);
    window.addEventListener('scroll', onScrollResize, { passive: true });

    if (container !== window) container.addEventListener('scroll', onScrollResize, { passive: true });
  })
}
