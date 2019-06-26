window.onload = function () {
    const myCustomElement = document.querySelector('jqx-numeric-text-box');

    myCustomElement.addEventListener('change', function (event) {
        const newValue = event.detail.value,
            oldValue = event.detail.oldValue;
        document.getElementById('log').innerHTML = 'New: ' + newValue + '; old: ' + oldValue;
    });
};