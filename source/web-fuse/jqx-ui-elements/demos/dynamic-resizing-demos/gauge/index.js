window.onload = function () {
    const gauge = document.getElementById('gauge');

    document.getElementById('resizeSlider').addEventListener('change', function (event) {
        const size = this.value + 'px';
        gauge.style.width = size;
    });
}