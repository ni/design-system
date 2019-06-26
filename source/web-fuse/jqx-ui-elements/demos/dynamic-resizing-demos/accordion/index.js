window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        accordion = document.getElementsByTagName("jqx-accordion")[0];
    let value;

    slider.addEventListener('change', function (event) {
        value = slider.value;
        accordion.style.width = value / 2 + 'px';
        accordion.style.height = value + 'px';
    });
};