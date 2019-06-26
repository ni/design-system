window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        textBox = document.getElementById('textBox');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        textBox.style.width = size + 'px';
        textBox.style.height = size / 2 + 'px';
    });
};