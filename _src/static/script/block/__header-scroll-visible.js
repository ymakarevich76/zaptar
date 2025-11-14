const header = document.querySelector('[data-header]');

if (header) {
    let lastScroll = 0;
    const screenHeight = 200;
    let triggerPoint = 0; // где начался апскролл
    let downStartPoint = 0; // где начался даунскролл после показа
    const showOffset = 100; // через сколько пикселей вверх показать
    const hideDelay = 100;   // через сколько пикселей вниз скрыть после показа

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // 1. добавляем header--is-fixed-hidden когда один экран проскролен
        if (currentScroll > screenHeight) {
            header.classList.add('header--is-fixed-hidden');
        } else {
            // 2. убираем классы при возврате к верху
            header.classList.remove('header--is-fixed-hidden');
            header.classList.remove('header--is-fixed-visible');
        }

        // скролл вверх
        if (currentScroll < lastScroll && currentScroll > screenHeight) {
            if (triggerPoint === 0) triggerPoint = lastScroll; // начало апскролла

            if (triggerPoint - currentScroll > showOffset) {
                header.classList.add('header--is-fixed-visible');
                header.classList.remove('header--is-fixed-hidden');
                downStartPoint = 0; // сбрасываем точку даунскролла
            }
        }

        // скролл вниз
        if (currentScroll > lastScroll && currentScroll > screenHeight) {
            if (header.classList.contains('header--is-fixed-visible')) {
                if (downStartPoint === 0) downStartPoint = lastScroll; // начало даунскролла
                if (currentScroll - downStartPoint > hideDelay) {
                    header.classList.remove('header--is-fixed-visible');
                    header.classList.add('header--is-fixed-hidden');
                    triggerPoint = 0;
                }
            } else {
                triggerPoint = 0;
            }
        }

        lastScroll = currentScroll;
    });
}
