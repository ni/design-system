window.onload = function () {
    const menu = document.getElementById('menu'),
        radioButtons = document.getElementsByTagName('jqx-radio-button');

    document.getElementById('resizeSlider').addEventListener('change', function (event) {
        const size = this.value + 'px';
        menu.style.width = size;
    });

    radioButtons[0].addEventListener('change', function (event) {
        menu.minimizeIconTemplate = null;
    });

    radioButtons[1].addEventListener('change', function (event) {
        menu.minimizeIconTemplate = 'customIconTemplate';
    });

    radioButtons[2].addEventListener('change', function (event) {
        menu.minimizeIconTemplate = 'textTemplate';
    });
}