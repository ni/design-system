window.onload = function () {
    const columnMenuButton = document.getElementById('columnMenuButton'),
        filterMenu = document.getElementById('filterMenu'),
        buttonContainer = document.getElementById('buttonContainer');

    columnMenuButton.addEventListener('click', function (event) {
        if (filterMenu.contains(event.target)) {
            return;
        }

        if (filterMenu.opened) {
            filterMenu.close();
        }
        else {
            filterMenu.open(-2, 29);
        }
    });

    buttonContainer.addEventListener('click', function (event) {
        if (event.target.closest('jqx-button')) {
            filterMenu.close();
        }
    });
}