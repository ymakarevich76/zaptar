const accordions = document.querySelectorAll('[data-accordion]');

if (accordions.length) {
  accordions.forEach(accordion => {
    const accordionButtons = accordion.querySelectorAll('[data-accordion-btn]');
    const accordionItems = accordion.querySelectorAll('[data-accordion-item]');
    accordionButtons.forEach((item, index) => {
      item.addEventListener('click', () => {
        accordionItems[index].classList.toggle('accordion__item-content--active');
      })
    });
  })
}
