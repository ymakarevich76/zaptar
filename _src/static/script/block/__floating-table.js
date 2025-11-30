const tables = document.querySelectorAll('[data-table]');

if(tables.length) {
    tables.forEach(table => {
        const container = document.querySelector('[data-table-scrollbar]');
        const inner = document.querySelector('[data-table-inner]');

        let floatingTable = null;

        const buildFloating = () => {
            if (floatingTable) return;

            floatingTable = document.createElement('table');
            floatingTable.className = 'table__floating-table';
            table.appendChild(floatingTable);

            const rows = inner.querySelectorAll('tr');

            rows.forEach((row) => {
                const src = row.querySelector('td:last-child, th:last-child');
                if (!src) return;

                const tr = document.createElement('tr');
                tr.className = 'table__floating-table-row';

                const td = document.createElement('td');
                td.className = 'table__floating-table-col';
                td.innerHTML = src.innerHTML;

                tr.appendChild(td);
                floatingTable.appendChild(tr);
            });

            syncHeights();
        };

        const removeFloating = () => {
            if (!floatingTable) return;
            floatingTable.remove();
            floatingTable = null;
        };

        const syncHeights = () => {
            if (!floatingTable) return;

            const srcRows = inner.querySelectorAll('tr');
            const flRows = floatingTable.querySelectorAll('.table__floating-table-row');

            flRows.forEach((flRow, i) => {
                const h = srcRows[i].offsetHeight;
                flRow.style.height = h + 'px';
            });
        };

        const updateState = () => {
            const need = inner.scrollWidth > container.clientWidth;

            if (need) {
                buildFloating();
                syncHeights();
            } else {
                removeFloating();
            }
        };

        updateState();

        window.addEventListener('resize', () => {
            updateState();
            syncHeights();
        });
    })
}
