window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');

    document.getElementById('openButton').addEventListener('click', function () {
        jqxWindow.opened ? jqxWindow.close() : jqxWindow.open();
    });

    jqxWindow.addEventListener('click', function (event) {
        if (event.target.closest('.jqx-dock-button')) {
            console.log('Dock');
            alert('Dock button pressed');
        }
        else if (event.target.closest('.jqx-block-button')) {
            console.log('Block');
            alert('Block button pressed');
        }
        else if (event.target.closest('.jqx-autoclose-button')) {
            console.log('Autoclose');
            alert('Autoclose button pressed');
        }
        else if (event.target.closest('.jqx-readonly-button')) {
            console.log('Readonly');
            alert('Readonly button pressed');
        }
        else if (event.target.closest('.jqx-pin-button')) {
            console.log('Pin');
            alert('Pin button pressed');
        }
        else if (event.target.closest('.jqx-close-button')) {
            console.log('Pin');
            alert('Close button pressed');
        }
    });
}