window.onload = function () {
    const dateTimePicker = document.getElementById('dateTimePicker'),
        radioButtons = document.getElementsByTagName('jqx-radio-button');

    radioButtons[0].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'auto';
    });

    radioButtons[1].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'bottom';
    });

    radioButtons[2].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'top';
    });

    radioButtons[3].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'overlay-bottom';
    });

    radioButtons[4].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'overlay-center';
    });

    radioButtons[5].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'overlay-top';
    });

    radioButtons[6].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'center-bottom';
    });

    radioButtons[7].addEventListener('change', function (event) {
        dateTimePicker.dropDownPosition = 'center-top';
    });

    radioButtons[8].addEventListener('change', function (event) {
        dateTimePicker.calendarButton = true;
        dateTimePicker.calendarButtonPosition = 'left';
    });

    radioButtons[9].addEventListener('change', function (event) {
        dateTimePicker.calendarButton = true;
        dateTimePicker.calendarButtonPosition = 'right';
    });

    radioButtons[10].addEventListener('change', function (event) {
        dateTimePicker.calendarButton = false;
    });
}