window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window'),
        radioButtons = document.getElementsByTagName('jqx-radio-button');

    document.getElementById('openButton').addEventListener('click', function () {
        jqxWindow.opened ? jqxWindow.close() : jqxWindow.open();
    });

    radioButtons[0].addEventListener('change', function () {
        jqxWindow.headerPosition = 'top';
    });

    radioButtons[1].addEventListener('change', function () {
        jqxWindow.headerPosition = 'bottom';
    });

    radioButtons[2].addEventListener('change', function () {
        jqxWindow.headerPosition = 'left';
    });

    radioButtons[3].addEventListener('change', function () {
        jqxWindow.headerPosition = 'right';
    });
}