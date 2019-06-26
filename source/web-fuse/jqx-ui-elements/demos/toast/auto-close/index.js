window.onload = function () {
    document.getElementById('openButton').addEventListener('click', function () {
        document.querySelectorAll('jqx-toast')[0].open();
    });
}