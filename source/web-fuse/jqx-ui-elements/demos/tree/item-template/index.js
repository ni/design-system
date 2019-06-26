window.onload = function () {
    function handleSwipe(event) {
        const originalTarget = event.originalEvent.target,
            closestItem = originalTarget.closest('jqx-tree-item') || originalTarget.closest('jqx-tree-items-group');

        if (closestItem && closestItem.level > 1 && closestItem.label !== 'editorTemplate') {
            const remove = window.confirm('Do you wish to remove item "' + closestItem.label + '"?');

            if (remove) {
                tree.removeItem(closestItem);
            }
        }
    }

    const tree = document.getElementById('tree');

    tree.addEventListener('swipeleft', function (event) {
        handleSwipe(event);
    });

    tree.addEventListener('swiperight', function (event) {
        handleSwipe(event);
    });

    tree.addEventListener('click', function (event) {
        const button = event.target.closest('jqx-button');

        if (!button) {
            return;
        }

        const input = button.previousElementSibling,
            editorItem = button.closest('jqx-tree-item'),
            treeItemsGroup = button.closest('jqx-tree-items-group');

        if (input.value) {
            const newItem = document.createElement('jqx-tree-item');

            newItem.innerHTML = input.value;
            tree.addBefore(newItem, editorItem);
            input.value = '';
        }
    });
}