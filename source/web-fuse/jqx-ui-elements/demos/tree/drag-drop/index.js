function dragFeedbackFormatFunction(draggedItems) {
    return `<div id="dragInnerContainer"><em>${draggedItems[0].label}</em ></div >`;
}

function dragEndHandler(event) {
    if (event.detail.items[0].label === 'Financial services') {
        event.preventDefault();
        return;
    }

    if (event.detail.container.tagName !== 'JQX-TREE') {
        const textBox = event.detail.target.closest('jqx-multiline-text-box');

        if (textBox) {
            textBox.value = event.detail.items[0].label;
        }
    }
}

window.onload = function () {
    const tree1 = document.getElementById('tree1'),
        tree2 = document.getElementById('tree2');

    tree1.addEventListener('dragStart', function (event) {
        if (event.detail.items[0].label === 'Communities') {
            event.preventDefault();
        }
    });

    tree1.addEventListener('dragEnd', dragEndHandler);
    tree2.addEventListener('dragEnd', dragEndHandler);
};
