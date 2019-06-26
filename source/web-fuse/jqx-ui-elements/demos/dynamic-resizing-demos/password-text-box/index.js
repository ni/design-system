window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        passwordTextBox = document.getElementById('passwordTextBox');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        passwordTextBox.style.width = size + 'px';
        passwordTextBox.style.height = size / 2 + 'px';
    });
};