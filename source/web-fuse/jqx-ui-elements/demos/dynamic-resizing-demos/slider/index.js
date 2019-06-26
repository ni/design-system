window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        horizontalSliderContainer = document.getElementById('horizontalSliderContainer'),
        verticalSliderContainer = document.getElementById('verticalSliderContainer');

    slider.addEventListener('change', function (event) {
        const size = slider.value + 'px';

        horizontalSliderContainer.style.width = size;

        verticalSliderContainer.style.height = size;
    });
};