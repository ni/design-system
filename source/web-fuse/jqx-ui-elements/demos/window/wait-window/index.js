window.onload = function () {
    const jqxWindow = document.querySelector('jqx-wait-window');

    document.getElementById('openButton').addEventListener('click', function () {
        if (jqxWindow.opened) {
            return;
        }

        jqxWindow.open();

        setTimeout(function () {
            jqxWindow.close();
        }, 2500);
    });
}