window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        resizedElements = document.querySelectorAll('jqx-radio-button');

    slider.addEventListener('change', function (event) {
        const resizedElementsCount = resizedElements.length,
		value = slider.value;

        for (let i = 0; i < resizedElementsCount; i++) {
            resizedElements[i].style.width = value + 'px';
        }
    });
    slider.val('100');
};