window.onload = function () {
    const dateTimePicker = document.getElementsByTagName('jqx-date-time-picker')[0];

    document.getElementById('setNewDateTime').addEventListener('click', function () {
        dateTimePicker.value = new JQX.Utilities.DateTime(2016, 5, 9, 12, 34, 11, 999, 1, 10, 36, 44, 440, 51, 557);
    });
}