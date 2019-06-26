window.onload = function () {
    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function (event) {
        document.querySelector('jqx-text-box').autoComplete = 'none';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function (event) {
        document.querySelector('jqx-text-box').autoComplete = 'auto';
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function (event) {
        document.querySelector('jqx-text-box').autoComplete = 'inline';
    });

    document.getElementsByTagName('jqx-radio-button')[3].addEventListener('change', function (event) {
        document.querySelector('jqx-text-box').autoComplete = 'manual';
    });
}