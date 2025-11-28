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
