window.onload = function () {
    const radioButtons = document.getElementById('controlPanel').getElementsByTagName('jqx-radio-button');

    radioButtons[0].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').dropDownButtonPosition = 'left';
    });

    radioButtons[1].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').dropDownButtonPosition = 'right';
    });
}