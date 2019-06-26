window.onload = function () {
    const slider = document.getElementById('horizontalSlider'),
        array = document.getElementById('array');

    slider.addEventListener('change', function (event) {
        const value = slider.value;

        array.style.width = value + 'px';
        array.style.height = value + 'px';
    });
};