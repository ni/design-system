window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        progressbarHorizontal = document.getElementById('progressbar1'),
        progressbarVertical = document.getElementById('progressbar2'),
        progressbarCircular = document.getElementById('progressbar3');
		
    slider.addEventListener('change', function (event) {
        const value = slider.value;
		
        progressbarHorizontal.style.width = value + 'px';
        progressbarHorizontal.style.height = value / 4 + 'px';
        progressbarVertical.style.height = value + 'px';
        progressbarVertical.style.width = value / 4 + 'px';
        progressbarCircular.style.width = value + 'px';
        progressbarCircular.style.height = value + 'px';
    });
};