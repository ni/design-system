window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');

    document.getElementById('open').addEventListener('click', function () {
        jqxWindow.opened ? jqxWindow.close() : jqxWindow.open();
    });

    document.getElementById('max').addEventListener('click', function () {
        jqxWindow.maximized ? jqxWindow.restore() : jqxWindow.maximize();
    });

    document.getElementById('min').addEventListener('click', function () {
        jqxWindow.minimized ? jqxWindow.restore() : jqxWindow.minimize();
    });

    document.getElementById('pin').addEventListener('click', function () {
        jqxWindow.pinned ? jqxWindow.unpin() : jqxWindow.pin();
    });

    document.getElementById('collapse').addEventListener('click', function () {
        jqxWindow.collapsed ? jqxWindow.expand() : jqxWindow.collapse();
    });

    document.getElementById('disable').addEventListener('click', function () {
        jqxWindow.disabled = !jqxWindow.disabled;
    });
}