function elementTemplateDropDownList(element, dimensions) {
    const customElement = document.createElement('jqx-drop-down-list');

    customElement.dataSource = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    customElement.selectionMode = 'one';
    customElement.dropDownAppendTo = 'body';

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function changeProperty1(property, value, widgets) {
    for (let i = 0; i < widgets.length; i++) {
        const currentCustomElement = widgets[i].children[0];

        if (property === 'width' || property === 'height') {
            currentCustomElement.style[property] = value + 'px';
        } else if (property === 'disabled') {
            currentCustomElement.disabled = value;
        }
    }
}

function getElementValue1(element, dimensions) {
    const customElement = element.children[0];

    return customElement.selectedValues[0];
}

function setElementValue1(value, element, dimensions) {
    const customElement = element.children[0];

    customElement.selectedValues = [value];
}

function elementTemplateComboBox(element, dimensions) {
    const customElement = document.createElement('jqx-combo-box');

    customElement.dataSource = ['Bulgaria', 'France', 'UK', 'USA', 'Other country'];
    customElement.selectionMode = 'one';
    customElement.dropDownAppendTo = 'body';

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateToggleButton(element, dimensions) {
    const customElement = document.createElement('jqx-toggle-button');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function getElementValue2(element, dimensions) {
    const customElement = element.children[0];

    return customElement.checked;
}

function setElementValue2(value, element, dimensions) {
    const customElement = element.children[0];

    if (value.toString() === 'true') {
        customElement.checked = true;
    }
    else {
        customElement.checked = false;
    }
}

function elementTemplateLed(element, dimensions) {
    const customElement = document.createElement('jqx-led');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplatePowerButton(element, dimensions) {
    const customElement = document.createElement('jqx-power-button');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateListBox(element, dimensions) {
    const customElement = document.createElement('jqx-list-box');

    customElement.dataSource = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    customElement.selectionMode = 'one';

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateProgressBar(element, dimensions) {
    const customElement = document.createElement('jqx-progress-bar');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function getElementValue3(element, dimensions) {
    const customElement = element.children[0];

    return customElement.value;
}

function setElementValue3(value, element, dimensions) {
    const customElement = element.children[0];

    customElement.value = parseFloat(value);
}

function elementTemplateCircularProgressBar(element, dimensions) {
    const customElement = document.createElement('jqx-circular-progress-bar');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateCheckBox(element, dimensions) {
    const customElement = document.createElement('jqx-check-box');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateGauge(element, dimensions) {
    const customElement = document.createElement('jqx-gauge');

    customElement.analogDisplayType = 'fill';
    customElement.labelsVisibility = 'none';
    customElement.scalePosition = 'outside';

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateTank(element, dimensions) {
    const customElement = document.createElement('jqx-tank');

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function elementTemplateSlider(element, dimensions) {
    const customElement = document.createElement('jqx-slider');

    customElement.labelsVisibility = 'none'
    customElement.showTooltip = true;
    customElement.rangeSlider = true;

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function getElementValue4(element, dimensions) {
    const customElement = element.children[0];

    return customElement.values;
}

function setElementValue4(value, element, dimensions) {
    const customElement = element.children[0];

    if (typeof value === 'string') {
        value = JSON.parse(value);
    }

    customElement.values = value;
}

function elementTemplateDateTimePicker(element, dimensions) {
    const customElement = document.createElement('jqx-date-time-picker');

    customElement.formatString = 'd';
    customElement.calendarButton = true;

    customElement.style.width = this.elementWidth + 'px';
    customElement.style.height = this.elementHeight + 'px';

    element.appendChild(customElement);
}

function getElementValue5(element, dimensions) {
    const customElement = element.children[0];

    return customElement.value.toDate();
}

function setElementValue5(value, element, dimensions) {
    const customElement = element.children[0];

    customElement.value = value;
}