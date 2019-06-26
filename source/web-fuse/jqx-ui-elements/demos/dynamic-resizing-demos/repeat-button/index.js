window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        repeatButton = document.getElementById('repeatButton');
		
    slider.addEventListener('change', function (event) {
        const value = slider.value;
        repeatButton.style.width = value + 'px';
        repeatButton.style.height = value / 2 + 'px';
    });
};