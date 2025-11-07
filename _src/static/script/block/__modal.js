const modalLinks = document.querySelectorAll('[data-modal]');
const body = document.querySelector('body');

const modalOpen = (currentModal) => {
  if (currentModal) {
    const modalActive = document.querySelector('.modal--open');
    if (modalActive) {
      modalClose(modalActive);
    }
  }

  body.classList.add('fixed');
  currentModal.classList.add('modal--open');

  currentModal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__content')) {
      modalClose(e.target.closest('.modal'));
    }
  })
}

const modalClose = (currentModal) => {
  currentModal.classList.remove('modal--open');
  body.classList.remove('fixed');
}

const closeIcons = document.querySelectorAll('.modal__close');
closeIcons.forEach((close) => {
  close.addEventListener('click', () => {
    modalClose(close.closest('.modal'));
  })
})

document.addEventListener('keydown', (e) => {
  if (e.which === 27) {
    const modalActive = document.querySelector('.modal--open');
    modalClose(modalActive);
  }
})

if (modalLinks.length > 0) {
  modalLinks.forEach((modalLink, index) => {
    modalLink.addEventListener('click', (e) => {
      const currentModal = document.getElementById('modal-auth');
      modalOpen(currentModal);
      e.preventDefault();
    })
  })
}
