window.onload = function () {
    const calendar = document.querySelector('jqx-calendar');

    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.scrollButtonsPosition = 'near';
        }
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.scrollButtonsPosition = 'far';
        }
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.scrollButtonsPosition = 'both';
        }
    });

    document.getElementsByTagName('jqx-radio-button')[3].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.scrollButtonsNavigationMode = 'landscape';
        }
    });

    document.getElementsByTagName('jqx-radio-button')[4].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.scrollButtonsNavigationMode = 'portrait';
        }
    });
}