window.onload = function () {
    const jqxArray = document.getElementById('jqxArray');

    document.getElementById('selectElement').addEventListener('click', function () {
        jqxArray.selectElement(0, 0);
    });

    document.getElementById('startSelection').addEventListener('click', function () {
        jqxArray.startSelection(0, 0);
    });

    document.getElementById('endSelection').addEventListener('click', function () {
        jqxArray.endSelection(0, 1);
    });

    document.getElementById('selectAll').addEventListener('click', function () {
        jqxArray.selectAll();
    });

    document.getElementById('clearSelection').addEventListener('click', function () {
        jqxArray.clearSelection();
    });
};