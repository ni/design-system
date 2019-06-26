window.onload = function () {
    const jqxArray = document.getElementById('jqxArray'),
        log = document.getElementById('log');

    jqxArray.addEventListener('scroll', function (event) {
        log.innerHTML = event.detail.direction + ' scrollbar scrolled.<br />' + log.innerHTML;
    });

    document.getElementById('enableIndexDisplay').addEventListener('change', function (event) {
        jqxArray.showIndexDisplay = event.detail.value;
    });

    document.getElementById('enableVerticalScrollbar').addEventListener('change', function (event) {
        jqxArray.showVerticalScrollbar = event.detail.value;
    });

    document.getElementById('enableHorizontalScrollbar').addEventListener('change', function (event) {
        jqxArray.showHorizontalScrollbar = event.detail.value;
    });
};