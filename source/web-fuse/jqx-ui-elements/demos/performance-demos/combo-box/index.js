let comboBoxes = [];
// appends 100 elements  on the page
function appendComboBoxes() {
    const comboBoxContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment(),
        source = [
           "Affogato",
           "Americano",
           "Bicerin",
           "Breve",
           "Café Bombón",
           "Café au lait",
           "Caffé Corretto",
           "Café Crema",
           "Caffé Latte",
           "Caffé macchiato",
           "Café mélange"
        ];

    for (let i = 0; i < 100; i++) {
        const comboBox = document.createElement('jqx-combo-box');

        comboBox.classList.add('testcomboBox');
        comboBox.dataSource = source;
        comboBox.selectionMode = 'one';
        comboBoxes.push(comboBox);
        containerFragment.appendChild(comboBox);
    }

    comboBoxContainer.appendChild(containerFragment);
    document.body.appendChild(comboBoxContainer);
}

function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            comboBoxes[i].selectedIndexes = [parseInt(Math.random() * 9 + 2)];
        }
    }, 1);
}

window.onload = function () {
    appendComboBoxes();

    runTest();
};