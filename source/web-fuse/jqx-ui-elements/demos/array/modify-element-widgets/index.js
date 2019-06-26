window.onload = function () {
    const jqxArray = document.getElementById('jqxArray');

    document.getElementById('hideSpinButtons').addEventListener('click', function () {
        jqxArray.elementTemplate = function (element, dimensions) {
            element.spinButtons = false;
        };
    });

    document.getElementById('changePrecisionDigits').addEventListener('click', function () {
        jqxArray.elementTemplate = function (element, dimensions) {
            element.precisionDigits = 3;
        };
    });

    document.getElementById('changeElementWidth').addEventListener('click', function () {
        jqxArray.setColumnWidth(150);
    });

    document.getElementById('changeElementHeight').addEventListener('click', function () {
        jqxArray.setRowHeight(50);
    });
};