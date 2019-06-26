window.onload = function () {
    const listBox = document.getElementById('listBox'),
        dropDownList = document.querySelector('jqx-drop-down-list'),
        button = document.querySelector('jqx-button');

    listBox.addEventListener('change', function (event) {
        console.log(event);
    });

    button.addEventListener('click', function () {
        listBox.selectedIndexes = [];
    });

    dropDownList.addEventListener('change', function (event) {
        listBox.selectionMode = event.detail.value;

    });

}