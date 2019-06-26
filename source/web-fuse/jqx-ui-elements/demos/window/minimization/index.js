window.onload = function () {
    const jqxWindows = document.getElementsByTagName('jqx-window');

    document.getElementById('openButton').addEventListener('click', function () {
        for (let w = 0; w < jqxWindows.length; w++) {
            jqxWindows[w].opened = !jqxWindows[w].opened
        }
    })
}