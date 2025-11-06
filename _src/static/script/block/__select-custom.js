const selects = document.querySelectorAll('[data-select]');

if (selects.length) {
  selects.forEach(select => {
    const selectButton = select.querySelector('[data-select-btn]');
    const selectButtonText = select.querySelector('[data-select-text]');
    const selectList = select.querySelector('[data-select-list]');
    const selectItems = select.querySelectorAll('[data-select-value]');
    const selectInput = select.querySelector('[data-select-input]');

    // функция для сворачивания списка
    const closeSelect = () => {
      select.classList.remove('select--active');
      selectList.classList.remove('select__list--visible');
    };

    // открытие/закрытие списка
    selectButton.addEventListener('click', () => {
      const isActive = select.classList.contains('select--active');

      // закрываем все открытые селекты перед открытием нового
      document.querySelectorAll('[data-select].select--active').forEach(openSelect => {
        openSelect.classList.remove('select--active');
        openSelect.querySelector('[data-select-list]').classList.remove('select__list--visible');
      });

      if (!isActive) {
        select.classList.add('select--active');
        selectList.classList.add('select__list--visible');
      }
    });

    // выбор элемента списка
    selectItems.forEach(item => {
      item.addEventListener('click', () => {
        selectButtonText.textContent = item.textContent;
        selectInput.value = item.dataset.selectValue;
        selectInput.setAttribute('value', item.dataset.selectValue);
        closeSelect();
      });
    });

    // закрытие при клике вне селекта
    document.addEventListener('click', e => {
      if (!select.contains(e.target)) closeSelect();
    });

    // закрытие при Esc
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSelect();
    });

    // закрытие при Tab (уход фокуса с последнего элемента)
    select.addEventListener('keydown', e => {
      if (e.code === 'Tab' && document.activeElement === selectItems[selectItems.length - 1]) {
        closeSelect();
      }
    });
  });
}
