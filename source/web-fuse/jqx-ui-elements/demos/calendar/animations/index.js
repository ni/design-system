window.onload = function () {
    const calendar = document.querySelector('jqx-calendar'),
        animationSwitch = document.getElementById('animationSwitch'),
        animationDirectionSwitch = document.getElementById('animationDirectionSwitch');

    animationSwitch.addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.animation = 'advanced';
        }
        else {
            calendar.animation = 'none';
        }

        document.getElementById('log').innerHTML = 'jqxCalendar animations ' + (event.detail.value ? 'On' : 'Off');
    });

    animationDirectionSwitch.addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.scrollButtonsNavigationMode = 'landscape';
        }
        else {
            calendar.scrollButtonsNavigationMode = 'portrait';
        }
    });
}