window.onload = function () {
    const calendar = document.querySelector('jqx-calendar'),
        checkBox = document.getElementById('rtlSelector');

    checkBox.addEventListener('change', function (event) {
        calendar.rightToLeft = event.detail.value;
        document.getElementById('log').innerHTML = 'Right-to-left is ' + (event.detail.value ? 'On' : 'Off');
    });
}