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
    const selectedValueFirst = item.hasAttribute('data-selected-value-first');

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
      document.querySelectorAll('[data-select].select--active').forEach(other => {
        if (other === item) return;

        const otherBtn = other.querySelector('[data-select-btn]');
        const otherList = other.querySelector('[data-select-list]');
        const otherSearch = other.querySelector('[data-select-search]');

        otherBtn.classList.remove('select--active');
        otherList.classList.remove('select__list--visible');

        if (other.hasAttribute('data-select-sort')) {
          otherBtn.classList.remove('d-none');
          if (otherSearch) otherSearch.classList.add('d-none');
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

    const resetButtons = [...document.querySelectorAll('[data-reset-select]')]
      .filter(btn =>
        btn.dataset.resetSelect
          .split(',')
          .map(x => x.trim())
          .includes(item.dataset.selectId)
      );

    // выбор элемента списка + hover-логика
    const bindItems = () => {
      items.forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault();
          resetButtons.forEach(btn => btn.removeAttribute('disabled'));

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

    // Получить и обновить блоки, зависящие от спец селекторов
    const updateLocalFields = (value) => {
      const getLocalFields = () => {
        let el = item;
        while (el && el !== document.body) {
          const found = el.querySelectorAll('[data-specific-field]');
          if (found.length) return Array.from(found);
          el = el.parentElement;
        }
        return [];
      };

      const local = getLocalFields();
      local.forEach(f => {
        f.classList.toggle('d-none', f.dataset.specificField !== value);
      });
    };

    const toggleSpecificBlock = () => {
      const update = () => {
        const selected = items.filter(i => i.classList.contains('select__item--selected'));
        const values = selected.length
          ? selected.map(s => s.dataset.selectValue)
          : [items[0].dataset.selectValue];

        updateLocalFields(values[0]);
      };

      update();
      items.forEach(opt => opt.addEventListener('click', () => setTimeout(update, 0)));
    };

    resetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        updateLocalFields(items[0].dataset.selectValue);

        selectText.textContent = selectText.dataset.selectText;
        selectText.classList.remove('select__text--active');
        input.value = '';
        selectedValueFirst ? selectSingle(items[0]) : null;
        btn.setAttribute('disabled', true);
      });
    });

    applyPreset();
    bindItems();
    toggleSpecificBlock();
  });
}
