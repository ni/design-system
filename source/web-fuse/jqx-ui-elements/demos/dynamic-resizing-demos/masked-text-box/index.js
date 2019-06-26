window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        maskedTextBox = document.getElementById('maskedTextBox');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        maskedTextBox.style.width = size + 'px';
        maskedTextBox.style.height = size / 2 + 'px';
    });
};