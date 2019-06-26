window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window'),
        eventLog = document.getElementById('log');

    function getElement(event) {
        const element = document.createElement('div');

        element.textContent = 'Type: ' + event.type;

        if (event.detail.x) {
            element.textContent += ', X: ' + event.detail.x + ', Y: ' + event.detail.y;
        }

        return element;
    }

    document.getElementById('openButton').addEventListener('click', function () {
        jqxWindow.opened ? jqxWindow.close() : jqxWindow.open();
    });

    jqxWindow.addEventListener('resize', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('drag', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('collapse', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('expand', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('maximize', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('minimize', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('restore', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('open', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('opening', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('close', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('closing', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('dragStart', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('dragEnd', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('resizeStart', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxWindow.addEventListener('resizeEnd', function (event) {
        eventLog.appendChild(getElement(event))
    });
}