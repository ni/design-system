window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        horizontalScrollBarContainer = document.getElementById('horizontalScrollBarContainer'),
        verticalScrollBarContainer = document.getElementById('verticalScrollBarContainer');

    slider.addEventListener('change', function (event) {
        const size = slider.value + 'px';

        horizontalScrollBarContainer.style.width = size;

        verticalScrollBarContainer.style.height = size;
    });
};