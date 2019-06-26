window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');

    document.querySelector('jqx-button').addEventListener('click', function () {
        jqxWindow.opened ? jqxWindow.close() : jqxWindow.open();
    });
}