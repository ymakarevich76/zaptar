const selects = document.querySelectorAll('[data-select]');

if (selects.length) {
  selects.forEach(select => {
    const selectButton = select.querySelector('[data-select-btn]');
    const selectButtonText = select.querySelector('[data-select-text]');
    const selectList = select.querySelector('[data-select-list]');
    const selectItems = select.querySelectorAll('[data-select-value]');
    const selectInput = select.querySelector('[data-select-input]');
    const isMultiple = select.hasAttribute('data-select-multiple');

    // функция для сворачивания списка
    const closeSelect = () => {
      select.classList.remove('select--active');
      selectList.classList.remove('select__list--visible');
    };

    // открытие/закрытие списка
    selectButton.addEventListener('click', (e) => {
      e.preventDefault();
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
      item.addEventListener('click', (e) => {
        e.preventDefault();

        if (!isMultiple) {
          // одиночный выбор: снимаем active со всех опций текущего селекта
          selectItems.forEach(i => i.classList.remove('select__item--active'));

          // ставим active на выбранный
          item.classList.add('select__item--active');

          selectButtonText.textContent = item.textContent.trim();
          selectInput.setAttribute('value', selectInput.value);
          closeSelect();
        } else {
          item.classList.toggle('select__item--active');

          const activeItems = Array.from(selectItems).filter(i =>
            i.classList.contains('select__item--active')
          );

          const activeTexts = activeItems.map(i => i.textContent.trim());
          const activeValues = activeItems.map(i => i.dataset.selectValue);

          selectButtonText.textContent = activeTexts.join(', ') || 'Не выбрано';
          selectInput.value = activeValues.join(',');
          selectInput.setAttribute('value', selectInput.value);
        }
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
