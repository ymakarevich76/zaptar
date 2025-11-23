const selects = document.querySelectorAll('[data-select]');

if (selects.length) {
  selects.forEach(item => {
    const select = item.querySelector('[data-select-btn]');
    const selectText = item.querySelector('[data-select-text]');
    const list = item.querySelector('[data-select-list]');
    const items = [...item.querySelectorAll('[data-select-value]')];
    const input = item.querySelector('[data-select-input]');
    const hasMultiple = item.hasAttribute('data-select-multiple');
    const hasSearch = item.hasAttribute('data-select-sort');
    const search = item.querySelector('[data-select-search]');
    const resetButtons = [...document.querySelectorAll('[type="reset"]')];
    const specificFields = document.querySelectorAll('[data-specific-field]');

    let lastHovered = null;

    // возвращает список к исходной структуре
    const restoreList = (items) => {
      list.innerHTML = '';
      items.forEach(i => {
        i.classList.remove('d-none');
        list.appendChild(i);
      });
      items[0].classList.add('select__item--active');
    };

    const open = () => {
      closeAll();
      restoreList(items);

      select.classList.add('select--active');
      list.classList.add('select__list--visible');

      if (hasSearch) {
        select.classList.add('d-none');
        search.classList.remove('d-none');
        input.focus();
        input.value = '';
      }
    };

    const close = () => {
      select.classList.remove('select--active');
      list.classList.remove('select__list--visible');

      if (hasSearch) {
        select.classList.remove('d-none');
        search.classList.add('d-none');
      }
    };

    const closeAll = () => {
      document.querySelectorAll('[data-select].select--active').forEach(select => {
        select.classList.remove('select--active');
        select.querySelector('[data-select-list]').classList.remove('select__list--visible');

        if (select.hasAttribute('data-select-sort')) {
          select.classList.remove('d-none');
          search.classList.add('d-none');
        }
      });
    };

    // сброс одиночного выбора
    const clearSingleSelect = (items) => {
      items.forEach(i => i.classList.remove('select__item--selected'));
    };

    // установка выбранного элемента
    const applySingleSelect = (item, selectText, input) => {
      item.classList.add('select__item--selected');
      selectText.textContent = item.textContent.trim();
      selectText.classList.add('select__text--active');
      input.value = item.dataset.selectValue;
      input.setAttribute('value', input.value);
    };

    // установка выбранных элементов
    const applyMultiSelect = (items, selectText, input) => {
      const active = items.filter(i =>
        i.classList.contains('select__item--selected')
      );
      const texts = active.map(i => i.textContent.trim());
      const values = active.map(i => i.dataset.selectValue);

      selectText.textContent = texts.join(', ') || 'Не выбрано';
      selectText.classList.add('select__text--active');
      input.value = values.join(',');
      input.setAttribute('value', input.value);
    };

    const applyPreset = () => {
      const preset = items.filter(i =>
        i.classList.contains('select__item--selected')
      );

      if (!preset.length) return;

      if (!hasMultiple) {
        clearSingleSelect(items);
        applySingleSelect(preset[0], selectText, input);
      } else {
        applyMultiSelect(preset, selectText, input)
      }
    };

    const selectSingle = item => {
      clearSingleSelect(items);
      applySingleSelect(item, selectText, input);
      close();
    };

    // выбор элемента списка + hover-логика
    const bindItems = () => {
      items.forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault();

          if (!hasMultiple) {
            selectSingle(item);
          } else {
            item.classList.toggle('select__item--selected');
            applyMultiSelect(items, selectText, input)
          }
        });

        item.addEventListener('mouseover', () => {
          if (lastHovered && lastHovered !== item) {
            lastHovered.classList.remove('select__item--active');
          }
          item.classList.add('select__item--active');
          lastHovered = item;
        });
      });
    };

    // поиск по опциям
    if (hasSearch) {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();

        const matched = items.filter(item =>
          item.textContent.trim().toLowerCase().includes(q)
        );

        if (matched.length === 0) {
          list.innerHTML = `<span class="select__empty">Ничего не найдено</span>`;
          return;
        }

        restoreList(matched);
      });
    }

    select.addEventListener('click', e => {
      e.preventDefault();
      select.classList.contains('select--active') ? close() : open();
    });

    // закрытие при клике вне селекта
    document.addEventListener('click', e => {
      if (!select.contains(e.target)) close();
    });

    // закрытие при Esc
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });

    // закрытие при Tab (уход фокуса с последнего элемента)
    select.addEventListener('keydown', e => {
      if (e.code === 'Tab' && document.activeElement === items[items.length - 1]) {
        close();
      }
    });

    resetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectText.textContent = selectText.dataset.selectText;
        selectText.classList.remove('select__text--active');
        input.value = '';
        specificFields.forEach(item => item.classList.add('d-none'));
        selectSingle(items[0]);
      });
    });

    // const toggleSpecificBlock = () => {
    //   items.forEach(option => {
    //     option.addEventListener('click', () => {
    //       const isSpecific = option.hasAttribute('data-specific-option');
    //
    //       specificFields.forEach(f => {
    //         f.classList.toggle('d-none', !isSpecific);
    //       });
    //     });
    //   });
    // };

    const toggleSpecificBlock = () => {
      // вычисляет поля, относящиеся к текущему селекту
      const localFields = item.nextElementSibling
        ? [...item.nextElementSibling.querySelectorAll('[data-specific-field]')]
        : [];

      items.forEach(option => {
        option.addEventListener('click', () => {
          const isSpecific = option.hasAttribute('data-specific-option');

          localFields.forEach(f => f.classList.toggle('d-none', !isSpecific));
        });
      });
    };

    applyPreset();
    bindItems();
    toggleSpecificBlock();
  });
}
