window.onload = function () {
    const radioButtons = document.getElementById('controlPanel').getElementsByTagName('jqx-radio-button');

    radioButtons[0].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownButtonPosition = 'left';
    });

    radioButtons[1].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownButtonPosition = 'right';
    });

    radioButtons[2].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownButtonPosition = 'top';
    });

    radioButtons[3].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownButtonPosition = 'bottom';
    });

    radioButtons[4].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownOpenMode = 'default';
    });

    radioButtons[5].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownOpenMode = 'dropDownButton';
    });
}