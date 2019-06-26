window.onload = function () {
    const tabs = [].slice.call(document.getElementsByTagName('jqx-tabs')),
        reorder = document.getElementById('reorder'),
        log = document.getElementById('log');

    tabs.map(function (t) {
        t.addEventListener('reorder', function (event) {
            log.innerHTML = 'Moved a tab from position ' + event.detail.originalIndex + ' to position ' + event.detail.newIndex + ' in <em>' + this.id + '</em>.';
        });
    });

    reorder.addEventListener('click', function () {
        tabs[2].getElementsByTagName('jqx-tab-item')[3].index = 0;
    });
}