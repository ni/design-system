window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        jqxFileUpload = document.querySelector('jqx-file-upload');

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        jqxFileUpload.style.width = size + 'px';
        jqxFileUpload.style.height = size / 2 + 'px';
    });
};