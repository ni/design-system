window.onload = function () {
    const slider = document.getElementById('horizontalSlider'),
        tabs = document.getElementById('tabs');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value + 'px';

        tabs.style.width = size;
        tabs.style.height = size;
    });
};