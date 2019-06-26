window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        numericTextBox = document.querySelector('jqx-numeric-text-box');
    let value;
    slider.addEventListener('change', function (event) {
        value = slider.value;
        numericTextBox.style.width = value + 'px';
        numericTextBox.style.height = value / 4 + 'px';
    });
};