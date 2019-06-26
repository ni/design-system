window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');

    document.querySelector('jqx-button').addEventListener('click', function () {
        if (jqxWindow.disableSnap) {
            jqxWindow.disableSnap = false;
            this.innerHTML = 'Disable Snapping';
        }
        else {
            jqxWindow.disableSnap = true;
            this.innerHTML = 'Enable Snapping';
        }
    })
}