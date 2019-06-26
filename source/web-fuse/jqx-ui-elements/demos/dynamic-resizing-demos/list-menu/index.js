window.onload = function () {
    const listMenu = document.getElementById('listMenu'),
        radioButtons = document.getElementsByTagName('jqx-radio-button');

    document.getElementById('resizeSlider').addEventListener('change', function (event) {
        const size = this.value + 'px';
        listMenu.style.width = size;
    });

    radioButtons[0].addEventListener('change', function (event) {
        listMenu.minimizeIconTemplate = null;
    });

    radioButtons[1].addEventListener('change', function (event) {
        listMenu.minimizeIconTemplate = 'customIconTemplate';
    });

    radioButtons[2].addEventListener('change', function (event) {
        listMenu.minimizeIconTemplate = 'textTemplate';
    });
}