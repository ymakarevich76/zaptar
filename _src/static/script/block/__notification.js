const notificationLinks = document.querySelectorAll('[data-notification]');
const notificationClose = (currentNotification) => {
  if (!currentNotification) return;
  currentNotification.classList.remove('notification--open');
};

const notificationOpen = (currentNotification) => {
  const activeNotification = document.querySelector('.notification--open');
  if (activeNotification && activeNotification !== currentNotification) {
    notificationClose(activeNotification);
  }

  if (!currentNotification) return;

  currentNotification.classList.add('notification--open');

  setTimeout(() => {
    notificationClose(currentNotification)
  }, 5000)
};

document.querySelectorAll('[data-btn]').forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    notificationClose(closeBtn.closest('.notification'));
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeNotification = document.querySelector('.notification--open');
    notificationClose(activeNotification);
  }
});

notificationLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const notificationId = link.dataset.notification;
    const targetNotification = document.getElementById(notificationId);
    notificationOpen(targetNotification);
  });
});
