window.onload = function () {
    const dialogWindow = document.querySelector('jqx-dialog-window'),
        alertWindow = document.querySelector('jqx-alert-window'),
        progressWindow = document.querySelector('jqx-progress-window'),
        waitWindow = document.querySelector('jqx-wait-window'),
        promptWindow = document.querySelector('jqx-prompt-window'),
        multilinePromptWindow = document.querySelector('jqx-multiline-prompt-window'),
        iconDialogWindow = document.getElementById('iconDialogWindow'),
        dropDownList = document.querySelector('jqx-drop-down-list');

    function dialogButtonsHandler(event) {
        if (event.target.closest('.jqx-cancel-button')) {
            document.getElementById('log').textContent = 'Canceled';
            this.close();
        }
        else if (event.target.closest('.jqx-confirm-button')) {
            document.getElementById('log').textContent = 'Confirmed';
            this.close();
        }
    }

    document.getElementById('openDialogButton').addEventListener('click', function () {
        dialogWindow.opened ? dialogWindow.close() : dialogWindow.open();
    });

    document.getElementById('openAlertButton').addEventListener('click', function () {
        alertWindow.opened ? alertWindow.close() : alertWindow.open();
    });

    dialogWindow.addEventListener('click', dialogButtonsHandler);

    alertWindow.addEventListener('click', function (event) {
        if (event.target.closest('.jqx-confirm-button')) {
            document.getElementById('log').textContent = 'Confirmed';
            alertWindow.close();
        }
    });

    document.getElementById('openProgressButton').addEventListener('click', function () {
        if (progressWindow.opened) {
            return;
        }

        progressWindow.innerHTML = 'Loading...';
        progressWindow.open();

        let interval = setInterval(function () {
            if (progressWindow.value >= progressWindow.max) {
                progressWindow.innerHTML = 'Finished';
                clearInterval(interval);
            }

            progressWindow.value += Math.random() * 10;
        }, 500);
    });

    progressWindow.addEventListener('click', function (event) {
        if (event.target.closest('.jqx-complete-button')) {
            progressWindow.close();
            progressWindow.value = 0;
        }
    });

    document.getElementById('openWaitButton').addEventListener('click', function () {
        if (waitWindow.opened) {
            return;
        }

        waitWindow.open();

        setTimeout(function () {
            waitWindow.close();
        }, 2500);
    });

    document.getElementById('openPromptButton').addEventListener('click', function () {
        promptWindow.opened ? promptWindow.close() : promptWindow.open();
    });

    promptWindow.addEventListener('click', dialogButtonsHandler);

    document.getElementById('openMultilinePromptButton').addEventListener('click', function () {
        multilinePromptWindow.opened ? multilinePromptWindow.close() : multilinePromptWindow.open();
    });

    multilinePromptWindow.addEventListener('click', dialogButtonsHandler);

    document.getElementById('openIconDialogButton').addEventListener('click', function () {
        const selectedItem = dropDownList.getItem(dropDownList.selectedValues[0]);

        document.getElementsByClassName('jqx-icon-dialog-icon')[0].innerHTML = '<span class="glyphicon glyphicon-' + selectedItem.value + '"></span>';
        document.getElementsByClassName('jqx-icon-dialog-content')[0].innerHTML = selectedItem.label;

        for (let i = 0; i < iconDialogWindow.classList.length; i++) {
            if (iconDialogWindow.classList[i].indexOf('jqx-theme-') > -1) {
                iconDialogWindow.classList.remove(iconDialogWindow.classList[i]);
            }
        }

        iconDialogWindow.classList.add('jqx-theme-' + selectedItem.label.toLowerCase());
        iconDialogWindow.opened ? iconDialogWindow.close() : iconDialogWindow.open();
    });

    iconDialogWindow.addEventListener('click', dialogButtonsHandler);

    document.addEventListener('click', function (event) {
        if (document.querySelector('jqx-check-box').checked) {
            dialogWindow.closeOnMaskClick = alertWindow.closeOnMaskClick = progressWindow.closeOnMaskClick =
                waitWindow.closeOnMaskClick = promptWindow.closeOnMaskClick = multilinePromptWindow.closeOnMaskClick =
                iconDialogWindow.closeOnMaskClick = true;
        }
        else {
            dialogWindow.closeOnMaskClick = alertWindow.closeOnMaskClick = progressWindow.closeOnMaskClick =
                waitWindow.closeOnMaskClick = promptWindow.closeOnMaskClick = multilinePromptWindow.closeOnMaskClick =
                iconDialogWindow.closeOnMaskClick = false;
        }
    });
}