window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');

    document.getElementById('openButton').addEventListener('click', function () {
        jqxWindow.opened ? jqxWindow.close() : jqxWindow.open();
    })
}