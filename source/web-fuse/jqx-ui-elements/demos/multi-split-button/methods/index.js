window.onload = function () {
    const multiSplitButton = document.getElementById('multiSplitButton');

    document.getElementById("insertButton").addEventListener('click', function () {
        multiSplitButton.insert(0, 'New Button', true);
    });
    document.getElementById("updateButton").addEventListener('click', function () {
        multiSplitButton.update(0, 'Button 0', true);
    });
    document.getElementById("removeButton").addEventListener('click', function () {
        multiSplitButton.remove(0, true);
    });

    document.getElementById("insertItem").addEventListener('click', function () {
        multiSplitButton.insert(0, 'New Item');
    });
    document.getElementById("updateItem").addEventListener('click', function () {
        multiSplitButton.update(0, 'Item 0');
    });
    document.getElementById("removeItem").addEventListener('click', function () {
        multiSplitButton.remove(0);
    });
}