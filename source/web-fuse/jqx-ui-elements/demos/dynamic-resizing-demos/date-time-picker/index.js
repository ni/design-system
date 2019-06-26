window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        dateTimePicker = document.getElementById('dateTimePicker');

    slider.addEventListener('change', function (event) {
        const value = slider.value;
        dateTimePicker.style.height = value / 5 + 'px';
        dateTimePicker.style.width = value + 'px';
    });
};