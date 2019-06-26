window.onload = function () {
    const tree = document.getElementById('tree'),
        treeRect = tree.getBoundingClientRect(),
        treeTooltip = document.getElementById('treeTooltip');

    tree.addEventListener('mousemove', function (event) {
        tree.classList.add('mouseover');

        const target = document.elementFromPoint(event.pageX, event.pageY),
            item = target.closest('jqx-tree-item, jqx-tree-items-group');

        if (!item) {
            tree.classList.remove('mouseover');
            return;
        }

        const itemRect = item.getBoundingClientRect();

        treeTooltip.innerHTML = item.label;
        treeTooltip.offset = [treeRect.right, itemRect.top + 5];
        treeTooltip.open();

        tree.classList.remove('mouseover');
    });

    tree.addEventListener('mouseleave', function () {
        treeTooltip.close();
    });
}
