const listCategories = document.querySelectorAll('[data-categories-list]');

if(listCategories.length) {
  listCategories.forEach(list => {
    const items = list.querySelectorAll('[data-categories-item]');
    const btns = list.querySelectorAll('[data-categories-btn]');
    const sublist = list.querySelectorAll('[data-categories-sublist]');

    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        items[index].classList.toggle('details__item--open');
        sublist[index].classList.toggle('d-none');
      })
    })
  })
}
