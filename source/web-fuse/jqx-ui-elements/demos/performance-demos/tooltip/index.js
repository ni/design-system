let newTooltipsList = [],
            tooltipPositions = ['top', 'left', 'bottom', 'right'];

function appendTooltips() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const button = document.createElement("jqx-button"),
            buttonId = 'btn' + i,
            tooltip = document.createElement("jqx-tooltip");

        button.innerHTML = "Click Me";
        button.id = buttonId;
        fragment.appendChild(button);
        fragment.appendChild(tooltip);

        tooltip.selector = buttonId;
        tooltip.value = 'Tooltip #' + i;
        tooltip.position = 'bottom';
        tooltip.arrow = true;

        newTooltipsList.push(tooltip);
    }
    document.body.appendChild(fragment);
}

function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            newTooltipsList[i].visible = Math.random() < 0.5;
        }
    }, 10);
}

window.onload = function () {
    appendTooltips();

    runTest();
};