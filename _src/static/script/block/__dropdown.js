const dropdowns = document.querySelectorAll('[data-dropdown]');

if (dropdowns.length) {
  dropdowns.forEach(dropdown => {
    const dropdownBtns = dropdown.querySelectorAll('[data-dropdown-btn]');
    const dropdownItems = dropdown.querySelectorAll('[data-dropdown-item]');

    dropdownBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        dropdownItems[index].classList.toggle('table-dropdown__content--visible');
      })
    })


    // закрытие при клике вне селекта
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) dropdownItems.forEach(item => item.classList.remove('table-dropdown__content--visible'));
    });
  })
}
