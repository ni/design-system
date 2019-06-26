window.onload = function () {
    const jqxSplitter = document.querySelector('jqx-splitter'),
        eventLog = document.getElementById('log');

    function getElement(event) {
        const element = document.createElement('div');

        element.textContent = 'Type: ' + event.type;

        if (event.detail.x) {
            element.textContent += ', X: ' + event.detail.x + ', Y: ' + event.detail.y;
        }

        return element;
    }

    jqxSplitter.addEventListener('resize', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxSplitter.addEventListener('expand', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxSplitter.addEventListener('collapse', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxSplitter.addEventListener('resizeStart', function (event) {
        eventLog.appendChild(getElement(event))
    });

    jqxSplitter.addEventListener('resizeEnd', function (event) {
        eventLog.appendChild(getElement(event))
    });
}