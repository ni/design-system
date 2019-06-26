window.onload = function () {
    function createTooltip(selector, item) {
        const tooltip = document.createElement('jqx-tooltip');

        tooltip.selector = selector;
        tooltip.arrow = true;
        tooltip.delay = 0;
        tooltip.position = 'right';
        tooltip.style.textAlign = 'left';
        tooltip.innerHTML = item.label;

        document.body.appendChild(tooltip);
    }

    const treeItems = document.getElementById('tree').items;

    for (let itemPath in treeItems) {
        const item = treeItems[itemPath];

        if (item instanceof JQX.TreeItem) {
            createTooltip(item, item);
        }
        else {
            // TreeItemsGroup
            createTooltip(item.firstElementChild, item);
        }
    }
}
