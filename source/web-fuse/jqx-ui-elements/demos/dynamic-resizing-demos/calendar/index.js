window.onload = function () {
    const slider = document.getElementById('horizontalSlider'),
        calendar = document.getElementById('calendar');

    slider.addEventListener('change', function (event) {
        const value = slider.value;

        calendar.style.height = value / 2 + 'px';
        calendar.style.width = value + 'px';
    });
};