window.onload = function () {
    const allMenus = Array.from(document.getElementsByTagName('jqx-menu')),
        menu1 = document.getElementById('menu1'),
        open1 = document.getElementById('open1');

    document.addEventListener('mouseup', function (event) {
        if (!event.target.closest('jqx-menu') &&
            !event.target.closest('.jqx-menu-drop-down') &&
            !event.target.closest('jqx-button')) {
            allMenus.forEach(function (menu) {
                menu.close();
            });
        }
    });

    open1.addEventListener('click', function () {
        menu1.open(10, 10);
    });

    open2.addEventListener('click', function () {
        menu2.open(10, 10);
    });

    open3.addEventListener('click', function () {
        menu3.open(10, 10);
    });
}
