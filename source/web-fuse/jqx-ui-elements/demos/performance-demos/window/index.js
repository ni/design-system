let windowList = [];

// appends 100 windows to the page
function appendWindows() {
    const windowContainer = document.createElement('div');

    for (let i = 0; i < 100; i++) {
        const newWindow = document.createElement('jqx-window');

        newWindow.label = 'Window' + i;
        newWindow.innerHTML = 'Random Text Number' + i;
        newWindow.classList.add('testWindow');

        windowList.push(newWindow);
        windowContainer.appendChild(newWindow);
    }

    document.body.appendChild(windowContainer);
}

// executes value updates for all windows in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            windowList[i].opened ? windowList[i].close() : windowList[i].open();
        }
    }, 10);
}

window.onload = function () {
    appendWindows();

    runTest();
};