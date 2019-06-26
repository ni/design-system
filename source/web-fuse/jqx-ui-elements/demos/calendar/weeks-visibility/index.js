window.onload = function () {
    const calendar = document.querySelector('jqx-calendar'),
        weeksSelector = document.getElementById('weeksCountSelector');

    weeksSelector.addEventListener('change', function (event) {
        calendar.weeks = parseInt(event.target.value);
    });
}