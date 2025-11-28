const date = document.querySelector('#order-date');

if(date) {
  const resetButtons = [...document.querySelectorAll('[type="reset"]')];

  flatpickr(date, {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    locale: "ru",
    onReady(selectedDates, dateStr, instance) {
      resetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          instance.clear();
        });
      });
    }
  });
}
