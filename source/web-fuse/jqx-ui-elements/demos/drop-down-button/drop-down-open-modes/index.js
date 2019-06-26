window.onload = function () {
    const dropDownButton = document.querySelector('jqx-drop-down-button');

    document.getElementsByTagName('jqx-button')[0].addEventListener('click', function () {
        dropDownButton.dropDownOpenMode = 'default';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });

    document.getElementsByTagName('jqx-button')[1].addEventListener('click', function () {
        dropDownButton.dropDownOpenMode = 'auto';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });

    document.getElementsByTagName('jqx-button')[2].addEventListener('click', function () {
        dropDownButton.dropDownOpenMode = 'dropDownButton';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });
    document.getElementsByTagName('jqx-button')[3].addEventListener('click', function () {
        dropDownButton.dropDownOpenMode = 'none';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });

    dropDownButton.addEventListener('click', function (event) {
        const log = document.getElementById('log');

        if (dropDownButton.dropDownOpenMode !== 'dropDownButton') {
            log.innerHTML = 'DropDownButton clicked';
            return;
        }

        if (event.target.classList.contains('jqx-action-button')) {
            log.textContent = 'ActionButton clicked';
        }
        else if (event.target.classList.contains('jqx-drop-down-button')) {
            log.textContent = 'DropDownButton clicked';
        }
    });

    document.getElementById('tab').addEventListener('change', function (event) {
        const tabsItems = this.getElementsByTagName('jqx-tab-item');

        dropDownButton.placeholder = tabsItems[event.detail.index].label;
    });
}