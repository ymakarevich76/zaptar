const wrap = document.querySelector('[data-filter-bar-shadow]');
const scroller = document.querySelector('[data-filter-bar-scrollbar]');

if (wrap && scroller) {
    const update = () => {
        const max = scroller.scrollWidth - scroller.clientWidth;
        const edge = 5;

        const atStart = scroller.scrollLeft <= edge;
        const atEnd   = scroller.scrollLeft >= max - edge;

        if (!atStart) {
            wrap.classList.add('filter-bar__shadow-wrap--left-shadow');
        } else {
            wrap.classList.remove('filter-bar__shadow-wrap--left-shadow');
        }

        if (!atEnd) {
            wrap.classList.add('filter-bar__shadow-wrap--right-shadow');
        } else {
            wrap.classList.remove('filter-bar__shadow-wrap--right-shadow');
        }
    };

    update();
    scroller.addEventListener('scroll', update);
    window.addEventListener('resize', update);
}
