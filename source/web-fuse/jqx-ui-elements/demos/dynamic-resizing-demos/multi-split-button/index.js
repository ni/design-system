window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        multiSplitButton = document.querySelector('jqx-multi-split-button');

    multiSplitButton.dataSource = [{ "value": "1", "label": "Btn 1", "button": true }, { "value": "2", "label": "Btn 2", "button": true }, { "value": "3", "label": "Btn 3", "button": true }, { "value": "4", "label": "Btn 4", "button": true }, { "value": "5", "label": "Btn 5", "button": true }, { "value": "6", "label": "Btn 6", "button": true }, { "value": "7", "label": "Btn 7" }, { "value": "8", "label": "Btn 8" }];

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        multiSplitButton.style.width = size + 'px';
    });
};