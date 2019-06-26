window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        horizontalTankContainer = document.getElementById('horizontalTank'),
        verticalTankContainer = document.getElementById('verticalTank');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value + 'px';

        horizontalTankContainer.style.width = size;

        verticalTankContainer.style.height = size;
    });
};