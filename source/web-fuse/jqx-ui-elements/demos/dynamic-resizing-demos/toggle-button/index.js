window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        toggleButton = document.querySelector('jqx-toggle-button');

    slider.addEventListener('change', function (event) {
        const value = slider.value;
        toggleButton.style.width = value + 'px';
        toggleButton.style.height = value / 2 + 'px';
    });
};