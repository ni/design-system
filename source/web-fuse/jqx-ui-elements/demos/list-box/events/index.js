window.onload = function () {
    const dropDownList = document.querySelector('jqx-drop-down-list'),
        listBox = document.getElementById('listBox'),
        eventLog = document.getElementById('log');

    function getElement(event) {
        const element = document.createElement('div');

        element.textContent = 'Type: ' + event.type;

        if (event.detail.x) {
            element.textContent += ', X: ' + event.detail.x + ', Y: ' + event.detail.y;
        }

        return element;
    }

    dropDownList.addEventListener('change', function (event) {
        listBox.selectionMode = event.detail.value;
    });

    listBox.addEventListener('change', function (event) {
        dropDownList.select(listBox.selectionMode);
        eventLog.appendChild(getElement(event))
    });

    listBox.addEventListener('changing', function (event) {
        console.log(event);
        //event.preventDefault(); // prevents the firing of change and changed events
        eventLog.appendChild(getElement(event))
    });

    listBox.addEventListener('changed', function (event) {
        console.log(event);
        eventLog.appendChild(getElement(event))
    });

}