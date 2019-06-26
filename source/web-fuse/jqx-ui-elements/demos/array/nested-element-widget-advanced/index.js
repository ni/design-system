function elementTemplate(element, dimensions) {
    element.style.width = this.elementWidth + 'px';
    element.style.height = this.elementHeight + 'px';

    const templateContent = document.importNode(document.getElementById('template').content, true);

    element.appendChild(templateContent);

    element.firstChild.addEventListener('change', function (event) {
        if (element.supressChange) {
            // 'supressChange' is set to true when scrolling the array and the 'change' events of the controls must not invoke the jqxArray 'change' event
            event.stopPropagation();
        }
    });
}

// 'getElementValue' is called when manually updating the inner widgets in order to reflect the change in the array's value itself (as well as in various other checks)
function getElementValue(element, dimensions) {
    const inputs = element.getElementsByTagName('input'),
        firstNameinput = inputs[0],
        lastNameinput = inputs[1];

    return { firstName: firstNameinput.value, lastName: lastNameinput.value };
}

// 'setElementValue' is called when setting the initial values of inner widgets and when scrolling the array
function setElementValue(value, element, dimensions) {
    const inputs = element.getElementsByTagName('input'),
        firstNameinput = inputs[0],
        lastNameinput = inputs[1];

    if (typeof value === 'string') {
        value = JSON.parse(value);
    }

    firstNameinput.value = value.firstName;
    lastNameinput.value = value.lastName;
}

window.onload = function () {
    const jqxArray = document.getElementById('jqxArray'),
        log = document.getElementById('log');

    document.getElementById('setValueToOneElement').addEventListener('click', function () {
        jqxArray.val({ firstName: 'Vestara', lastName: 'Khai' }, [2, 0]);
    });

    jqxArray.addEventListener('change', function (event) {
        const value = event.target.val();

        log.innerHTML = JSON.stringify(value) + '<hr />' + log.innerHTML;
    });
};