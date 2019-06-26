window.onload = function () {
    const calendar = document.querySelector('jqx-calendar');

    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function () {
        calendar.view = 'landscape';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function () {
        calendar.view = 'portrait';
    });
}