const initTabs = (btnAttr, contentAttr, btnActiveClass, contentActiveClass) => {
  const tabs = document.querySelectorAll(`[${btnAttr}]`);
  if (!tabs.length) return;

  const contents = document.querySelectorAll(`[${contentAttr}]`);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const value = tab.getAttribute(btnAttr);

      tabs.forEach(t => t.classList.remove(btnActiveClass));
      contents.forEach(c => c.classList.remove(contentActiveClass));

      tab.classList.add(btnActiveClass);
      const target = document.querySelector(`[${contentAttr}="${value}"]`);
      if (target) target.classList.add(contentActiveClass);
    });
  });
};

initTabs('tab', 'tab-content', 'tabs__btn--active', 'tabs__content--active');
initTabs('tab-2', 'tab-2-content', 'tabs-2__btn--active', 'tabs-2__content--active');
