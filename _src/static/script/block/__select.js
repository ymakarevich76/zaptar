const selects = document.querySelectorAll('[data-select]');

if (selects.length) {
  selects.forEach(select => {
    const btn = select.querySelector('[data-select-btn]');
    const btnText = select.querySelector('[data-select-text]');
    const list = select.querySelector('[data-select-list]');
    const items = [...select.querySelectorAll('[data-select-value]')];
    const input = select.querySelector('[data-select-input]');
    const hasMultiple = select.hasAttribute('data-select-multiple');
    const hasSearch = select.hasAttribute('data-select-sort');
    const search = select.querySelector('[data-select-search]');
    const icons = [...select.querySelectorAll('[data-select-ico]')];
    const resetButtons = [...document.querySelectorAll('[type="reset"]')];

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
        btn.classList.add('d-none');
        search.classList.remove('d-none');
        input.focus();
        input.value = '';
      }
    };

    const close = () => {
      select.classList.remove('select--active');
      list.classList.remove('select__list--visible');

      if (hasSearch) {
        btn.classList.remove('d-none');
        search.classList.add('d-none');
      }
    };

    const closeAll = () => {
      document.querySelectorAll('[data-select].select--active').forEach(select => {
        select.classList.remove('select--active');
        select.querySelector('[data-select-list]').classList.remove('select__list--visible');

        if (select.hasAttribute('data-select-sort')) {
          btn.classList.remove('d-none');
          search.classList.add('d-none');
        }
      });
    };

    // сброс одиночного выбора
    const clearSingleSelect = (items) => {
      items.forEach(i => i.classList.remove('select__item--selected'));
    };

    // установка выбранного элемента
    const applySingleSelect = (item, btnText, input) => {
      item.classList.add('select__item--selected');
      btnText.textContent = item.textContent.trim();
      btnText.classList.add('select__text--active');
      input.value = item.dataset.selectValue;
      input.setAttribute('value', input.value);
    };

    // установка выбранных элементов
    const applyMultiSelect = (items, btnText, input) => {
      const active = items.filter(i =>
        i.classList.contains('select__item--selected')
      );
      const texts = active.map(i => i.textContent.trim());
      const values = active.map(i => i.dataset.selectValue);

      btnText.textContent = texts.join(', ') || 'Не выбрано';
      btnText.classList.add('select__text--active');
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
        applySingleSelect(preset[0], btnText, input);
      } else {
        applyMultiSelect(preset, btnText, input)
      }
    };

    const selectSingle = item => {
      clearSingleSelect(items);
      applySingleSelect(item, btnText, input);
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
            applyMultiSelect(items, btnText, input)
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

    btn.addEventListener('click', e => {
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
        btnText.textContent = btnText.dataset.selectText;
        btnText.classList.remove('select__text--active');
        input.value = '';
      });
    });

    applyPreset();
    bindItems();
  });
}
