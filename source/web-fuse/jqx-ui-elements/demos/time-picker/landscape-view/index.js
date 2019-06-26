window.onload = function () {
    const toggleView = document.getElementById('toggleView'),
        timePicker = document.getElementById('timePicker');

    toggleView.addEventListener('change', function (event) {
        if (!event.detail.value) {
            timePicker.view = 'portrait';
        }
        else {
            timePicker.view = 'landscape';
        }
    });
}