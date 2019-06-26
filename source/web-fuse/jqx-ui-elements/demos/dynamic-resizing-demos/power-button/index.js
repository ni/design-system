window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
       powerButton = document.querySelector('jqx-power-button');
    let value;
    slider.addEventListener('change', function (event) {
        value = slider.value;
        powerButton.style.height = value + 'px';
        powerButton.style.width = value + 'px';
    });
};