window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        switchButton = document.querySelector('jqx-switch-button');

    slider.addEventListener('change', function (event) {
        const value = slider.value;
        switchButton.style.setProperty('--jqx-switch-button-default-width', value + 'px');
        switchButton.style.setProperty('--jqx-switch-button-default-height', value / 2 + 'px')
    });
};