function customSortingFunction(items, parentItem) {
    if (parentItem.label === 'Numbers') {
        items.sort(function (a, b) {
            return parseFloat(a.label) - parseFloat(b.label);
        });
    }
    else if (parentItem.label === 'Letters') {
        items.sort(function (a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        });
    }
    else {
        // apply default sorting
        items.sort(function (a, b) {
            return (a.label).localeCompare(b.label);
        });
    }
}

window.onload = function () {
    document.getElementById('sorted').addEventListener('change', function (event) {
        document.getElementById('tree1').sorted = event.detail.value;
        document.getElementById('tree2').sorted = event.detail.value;
        document.getElementById('tree3').sorted = event.detail.value;
    });
}