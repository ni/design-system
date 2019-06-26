window.onload = function () {
    const dateTimePicker = document.getElementsByTagName('jqx-date-time-picker')[0];

    document.getElementById('chooseFormat').addEventListener('change', function (event) {
        dateTimePicker.formatString = event.detail.value;
    });
}