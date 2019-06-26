window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        jqxSplitter = document.querySelector('jqx-splitter');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        jqxSplitter.style.width = size + 'px';
        jqxSplitter.style.height = size + 'px';
    });
};