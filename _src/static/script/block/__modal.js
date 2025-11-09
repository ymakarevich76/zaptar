const modalLinks = document.querySelectorAll('[data-modal]');
const body = document.querySelector('body');

const modalClose = (currentModal) => {
  if (!currentModal) return;
  currentModal.classList.remove('modal--open');

  // если нет открытых модалок — возвращаем прокрутку
  if (!document.querySelector('.modal--open')) {
    body.classList.remove('fixed');
  }
};

const modalOpen = (currentModal) => {
  const activeModal = document.querySelector('.modal--open');
  if (activeModal && activeModal !== currentModal) {
    modalClose(activeModal);
  }

  if (!currentModal) return;

  currentModal.classList.add('modal--open');
  body.classList.add('fixed');

  // закрытие при клике вне модального контента
  currentModal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__content')) {
      modalClose(currentModal);
    }
  });
};

document.querySelectorAll('[data-btn]').forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    modalClose(closeBtn.closest('.modal'));
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal--open');
    modalClose(activeModal);
  }
});

modalLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const modalId = link.dataset.modal;
    const targetModal = document.getElementById(modalId);
    modalOpen(targetModal);
  });
});
