window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        jqxWindow = document.querySelector('jqx-window');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        jqxWindow.style.width = size + 'px';
        jqxWindow.style.height = size / 2 + 'px';
    });
};