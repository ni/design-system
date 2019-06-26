window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        dropDownList = document.querySelector('jqx-drop-down-list');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        dropDownList.style.width = size + 'px';
        dropDownList.style.height = size / 2 + 'px';
    });
};