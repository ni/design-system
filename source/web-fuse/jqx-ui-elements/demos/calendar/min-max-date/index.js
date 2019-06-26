window.onload = function () {
    const calendar = document.querySelector('jqx-calendar');

    document.getElementById('minInput').addEventListener('change', function (event) {
        calendar.min = event.target.value;
    });

    document.getElementById('maxInput').addEventListener('change', function (event) {
        calendar.max = event.target.value;
    });
}