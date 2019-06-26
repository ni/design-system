window.onload = function () {
    const tree = document.getElementById('tree'),
        log = document.getElementById('log');

    // change event
    tree.addEventListener('change', function (event) {
        updateEventLog(event, event.detail.item);
    });

    // expand event
    tree.addEventListener('expand', function (event) {
        updateEventLog(event, event.detail.item);
    });

    // expanding event
    tree.addEventListener('expanding', function (event) {
        updateEventLog(event, event.detail.item);
    });

    // collapse event
    tree.addEventListener('collapse', function (event) {
        updateEventLog(event, event.detail.item);
    });

    // collapsing event
    tree.addEventListener('collapsing', function (event) {
        updateEventLog(event, event.detail.item);
    });

    // dragging event
    tree.addEventListener('dragging', function (event) {
        updateEventLog(event, event.detail.items[0]);
    });

    // dragStart event
    tree.addEventListener('dragStart', function (event) {
        updateEventLog(event, event.detail.items[0]);
    });

    // dragEnd event
    tree.addEventListener('dragEnd', function (event) {
        updateEventLog(event, event.detail.items[0]);
    });

    function updateEventLog(event, item) {
        const eventContainer = document.createElement('div');

        eventContainer.innerText = event.type + ' item "' + item.label;
        log.insertBefore(eventContainer, log.firstElementChild);
    }
}