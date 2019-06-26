window.onload = function () {
    const splitter = document.querySelector('jqx-splitter');
    let counter = 2;

    splitter.addEventListener('dblclick', function (event) {
        const splitterItem = event.target.closest('jqx-splitter-item');

        if (splitterItem) {
            const splitterItemNumber = parseFloat(splitterItem.textContent);

            splitterItem.content = '<jqx-splitter>' +
                '<jqx-splitter-item>' + splitterItem.innerHTML + '</jqx-splitter-item>' +
                '<jqx-splitter-item>New Item' + '</jqx-splitter-item>' +
                '</jqx-splitter>';

            counter = splitterItemNumber;
        }
    });
}