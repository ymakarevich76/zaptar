const anchors = document.querySelectorAll('a[href^="#scroll"]');

if (anchors.length) {
  anchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = anchor.hasAttribute('href');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
