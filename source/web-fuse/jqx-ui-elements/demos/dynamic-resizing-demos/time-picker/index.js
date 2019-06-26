window.onload = function () {
    const slider = document.getElementById('horizontalSlider'),
        timePicker = document.getElementById('timePicker');

    slider.addEventListener('change', function (event) {
        const value = slider.value;

        timePicker.style.width = value + 'px';
        timePicker.style.height = 1.67 * value + 'px';
    });
};