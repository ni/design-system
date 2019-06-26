window.onload = function () {
    const multiSplitButton = document.getElementById('multiSplitButton'),
        log = document.getElementById('log');

    multiSplitButton.dataSource = [{ "value": "1", "label": "Btn 1", "button": true }, { "value": "2", "label": "Btn 2", "button": true }, { "value": "3", "label": "Btn 3" }, { "value": "4", "label": "Btn 4" }];
    multiSplitButton.addEventListener('itemClick', function (event) {
        log.innerHTML = 'label:' + event.detail.label + ', value:' + event.detail.value;
    });
}