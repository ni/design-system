window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        button = document.querySelector('jqx-button');
    let value;
    slider.addEventListener('change', function (event) {
        value = slider.value;
        button.style.height = value / 2 + 'px';
        button.style.width = value + 'px';
    });
};