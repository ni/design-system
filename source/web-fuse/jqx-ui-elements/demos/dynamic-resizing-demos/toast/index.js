window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        toastContainerTopRight = document.querySelector('.jqx-toast-container-top-right');

    slider.addEventListener('change', function (event) {
        toastContainerTopRight.style.width = slider.value + 'px';
    });
};