const tooltips = document.querySelectorAll('[data-tippy-content]');

if(tooltips.length) {
  console.log(tooltips)
  tooltips.forEach(tooltip => {
    tippy(tooltip);
  })
}
