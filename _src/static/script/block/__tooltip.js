const tooltips = document.querySelectorAll('[data-tippy-content]');

if(tooltips.length) {
  tooltips.forEach((tooltip, index) => {
    const width = tooltip.dataset.widthTooltip ? Number(tooltip.dataset.widthTooltip) : 232

    tippy(tooltip, {
      theme: 'default',
      maxWidth: width,
    });
  })
}

const tooltipsLight = document.querySelectorAll('[data-tippy-content-light]');

if(tooltipsLight.length) {
  tooltipsLight.forEach((tooltip, index) => {
    const width = tooltip.dataset.widthTooltip ? Number(tooltip.dataset.widthTooltip) : 232

    tippy(tooltip, {
      theme: 'light',
      maxWidth: width,
    });
  })
}

const tooltipsWithCode = document.querySelectorAll('[data-tippy-with-code-content]');

if(tooltipsWithCode.length) {
  tooltipsWithCode.forEach((tooltipWithCode, index) => {
    const width = tooltipWithCode.dataset.widthTooltip ? Number(tooltipWithCode.dataset.widthTooltip) : 232

    const tooltipContent = `
    Возврат возможен при соблюдении следующих условий:
    <ul>
        <li>Упаковка и деталь в товарном виде.</li>
        <li>Деталь не была установлена.</li>
        <li>Сохранены стикеры поставщика.</li>
        <li>Рекламация подана не позднее 7 дней после статуса "Отгружено".</li>
    </ul>
    <br>
    Не принимаются к возврату: масла, жидкости и детали электрической группы.`

    tippy(tooltipWithCode, {
      content: tooltipContent,
      allowHTML: true,
      theme: 'default',
      maxWidth: width,
    });
  })
}

const tooltipsWithCodeLight = document.querySelectorAll('[data-tippy-with-code-content-light]');

if(tooltipsWithCodeLight.length) {
  tooltipsWithCodeLight.forEach((tooltipWithCode, index) => {

    const tooltipContentFirst = `
      <div class="tooltip-statistic">
        <span class="tooltip-statistic__title">Показатели статистики выдачи</span>
        Сроки указаны в рабочих днях до склада МСК. Выбирая поставщика, изучите статистику отгрузок.
        <span class="tooltip-statistic__title">Индикаторы качества выдачи</span>
        <p class="tooltip-statistic__indicator tooltip-statistic__indicator--1">90% - 100% выданных заказов</p>
        <p class="tooltip-statistic__indicator tooltip-statistic__indicator--2">70% - 89% выданных заказов</p>
        <p class="tooltip-statistic__indicator tooltip-statistic__indicator--3">40% - 69% выданных заказов</p>
        <p class="tooltip-statistic__indicator tooltip-statistic__indicator--4">20% - 39% выданных заказов</p>
        <p class="tooltip-statistic__indicator tooltip-statistic__indicator--5">0% - 19% выданных заказов</p>
      </div>`

    const tooltipContentSecond = `
      <div class="tooltip-status">
        <p><span class="tooltip-status__text">Качество выдачи:</span> <span class="tooltip-status__procent">92%</span></p>
        <p><span class="tooltip-status__text">Склад:</span> Минимальная партия 10 шт</p>
        <p><span class="tooltip-status__text">Дата обновления цены:</span> Сегодня</p>
      </div>`

    const tooltipContent = Number(tooltipWithCode.dataset.tippyWithCodeContentLight) === 1 ? tooltipContentFirst : tooltipContentSecond;

    tippy(tooltipWithCode, {
      content: tooltipContent,
      allowHTML: true,
      theme: 'light',
      maxWidth: 265,
    });
  })
}
