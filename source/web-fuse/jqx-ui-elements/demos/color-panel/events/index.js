window.onload = function () {
    const log = document.getElementById('log');

    document.querySelector('jqx-color-panel').addEventListener('change', function (event) {
        log.innerHTML += '<b>type:</b> ' + event.type + ', <b>value:</b> ' + event.detail.value + '<br />';
    });
}