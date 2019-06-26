function elementTemplate(element, dimensions) {
    const innerArray = document.createElement('jqx-array');

    innerArray.showIndexDisplay = true;
    innerArray.type = 'string';
    innerArray.dimensions = 2;
    innerArray.rows = 3;
    innerArray.columns = 2;

    element.appendChild(innerArray);
}

function getElementValue(element, dimensions) {
    return element.firstChild.value;
}

function setElementValue(value, element, dimensions) {
    element.firstChild.value = value;
}

window.onload = function () {
    const jqxArray = document.getElementById('jqxArray'),
        log = document.getElementById('log');

    jqxArray.addEventListener('change', function (event) {
        const value = event.target.val();

        log.innerHTML = JSON.stringify(value) + '<hr />' + log.innerHTML;
    });

    document.getElementById('resetMainArray').addEventListener('click', function () {
        jqxArray.reset();
        document.getElementById('emptyMainArray').disabled = true;
    });

    document.getElementById('emptyMainArray').addEventListener('click', function () {
        jqxArray.emptyArray();
    });
};