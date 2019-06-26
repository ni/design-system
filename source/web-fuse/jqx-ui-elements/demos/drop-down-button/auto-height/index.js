window.onload = function () {
    var dropDownButton = document.querySelector('jqx-drop-down-button'),
        tree = dropDownButton.querySelector('jqx-tree');

    //Get the label of the selected tree item
    dropDownButton.placeholder = tree.querySelector('jqx-tree-item[selected], jqx-tree-items-group[selected]').label;

    dropDownButton.addEventListener('change', function () {
        this.placeholder = event.detail.item.label;
    });
}