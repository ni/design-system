window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');

    document.getElementById('openWindows').addEventListener('click', function () {
        const windows = document.getElementsByTagName('jqx-window');

        for (let i = 0; i < windows.length; i++) {
            windows[i].open();
        }
    });

    document.getElementById('addWindow').addEventListener('click', function () {
        const newWindow = document.createElement('jqx-window'),
            windowCount = document.getElementsByTagName('jqx-window').length;

        newWindow.id = newWindow.label = 'Window ' + (windowCount + 1);
        newWindow.content = 'This is the content of Window ' + (windowCount + 1);
        newWindow.opened = true;
        newWindow.resizable = true;
        newWindow.classList.add('animation');

        document.body.appendChild(newWindow);
    });
}