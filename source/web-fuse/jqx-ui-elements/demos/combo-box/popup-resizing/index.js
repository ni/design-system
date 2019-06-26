window.onload = function (event) {
    const radioButtons = document.getElementsByTagName('jqx-radio-button');

    radioButtons[0].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').resizeMode = 'none';
    });

    radioButtons[1].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').resizeMode = 'vertical';
    });

    radioButtons[2].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').resizeMode = 'horizontal';
    });

    radioButtons[3].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').resizeMode = 'both';
    });

    radioButtons[4].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').dropDownPosition = 'bottom';
    });

    radioButtons[5].addEventListener('change', function () {
        document.querySelector('jqx-combo-box').dropDownPosition = 'top';
    });
}