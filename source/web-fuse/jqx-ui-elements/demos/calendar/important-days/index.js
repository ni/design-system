window.onload = function () {
    const importantDates = document.querySelector('jqx-calendar').importantDates,
	calendar = document.querySelector('jqx-calendar');

    for (let d = 0; d < importantDates.length; d++) {
        document.getElementById('importantDates').innerHTML += importantDates[d] + '</br>';
    }

    document.querySelector('jqx-calendar').addEventListener('open', function (event) {
        const date = event.detail.owner;

        if (date.value.getFullYear() === 2017) {
            calendar.tooltipPosition = 'top';
            if (date.value.getMonth() === 5 && date.value.getDate() === 9) {
                event.target.innerHTML = 'Ivan\'s Birthday !';
            }
            else if (date.value.getMonth() === 6) {
                if (date.value.getDate() === 1) {
                    event.target.innerHTML = 'Filip\'s Birthday !';
                }
                else {
                    event.target.innerHTML = 'Anthony\'s Birthday !';
                    calendar.tooltipPosition = 'right';
                }
            }
        }
    });
}