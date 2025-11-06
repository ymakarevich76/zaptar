if (document.querySelector('[tab]')) {
  const tabs = document.querySelectorAll('[tab]');
  const contents = document.querySelectorAll('[tab-content]');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (event) => {
      const tabValue = tab.getAttribute('tab');

      tabs.forEach(t => t.classList.remove('tabs__btn--active'));
      contents.forEach(c => c.classList.remove('tabs__content--active'));

      tab.classList.add('tabs__btn--active');
      document.querySelector(`[tab-content="${tabValue}"]`).classList.add('tabs__content--active');
    })
  });
}
