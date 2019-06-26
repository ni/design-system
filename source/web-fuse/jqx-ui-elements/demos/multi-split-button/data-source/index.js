window.onload = function () {
    const multiSplitButton = document.getElementById('multiSplitButton');

    document.getElementById("arrayWithStringItems").addEventListener('click', function () {
        multiSplitButton.dataSource = ["Affogato", "Americano", "Bicerin", "Breve", "Café Bombón"];
    });
    document.getElementById("arrayWithObjects").addEventListener('click', function () {
        multiSplitButton.dataSource = [{ "value": "1", "label": "Btn 1", "button": true }, { "value": "2", "label": "Btn 2", "button": true }, { "value": "3", "label": "Btn 3", "button": true }, { "value": "4", "label": "Btn 4", "button": true }, { "value": "5", "label": "Btn 5", "button": true }, { "value": "6", "label": "Btn 6", "button": true }, { "value": "7", "label": "Btn 7" }, { "value": "8", "label": "Btn 8" }];
    });
}