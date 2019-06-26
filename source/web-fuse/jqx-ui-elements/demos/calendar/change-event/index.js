window.onload = function () {
    const calendar = document.querySelector('jqx-calendar');

    calendar.addEventListener('change', function (event) {
        document.getElementById('eventLog').innerHTML = event.detail.value.toString();
    });
}