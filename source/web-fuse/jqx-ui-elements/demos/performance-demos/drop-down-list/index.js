let dropDownLists = [];
// appends 100 elements  on the page
function appendDropDownLists() {
    const dropDownListContainer = document.createElement('div'),
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
        const dropDownList = document.createElement('jqx-drop-down-list');

        dropDownList.classList.add('testDropDownList');
        dropDownList.dataSource = source;
        dropDownLists.push(dropDownList);
        containerFragment.appendChild(dropDownList);
    }

    dropDownListContainer.appendChild(containerFragment);
    document.body.appendChild(dropDownListContainer);
}

function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            //dropDownLists[i].open();
            dropDownLists[i].selectedIndexes = [parseInt(Math.random() * 9 + 2)];
            //dropDownLists[i].close();
        }
    }, 1);
}

window.onload = function () {
    appendDropDownLists();

    runTest();
};