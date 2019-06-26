window.onload = function () {
    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function () {
        document.querySelector('jqx-tooltip').position = 'top';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function () {
        document.querySelector('jqx-tooltip').position = 'bottom';
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function () {
        document.querySelector('jqx-tooltip').position = 'left';
    });
    document.getElementsByTagName('jqx-radio-button')[3].addEventListener('change', function () {
        document.querySelector('jqx-tooltip').position = 'right';
    });
}