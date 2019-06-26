window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        textBox = document.getElementById('multilineTextBox');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value + 'px';

        textBox.style.width = size;
        textBox.style.height = size;
    });
};