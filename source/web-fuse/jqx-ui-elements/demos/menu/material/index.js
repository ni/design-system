window.onload = function () {
    const menu1Container = document.getElementById('menu1Container'),
        menu3Container = document.getElementById('menu3Container'),
        listMenu2Container = document.getElementById('listMenu2Container'),
        menuTokens = document.getElementsByClassName('menu-token'),
        menu1 = document.getElementById('menu1'),
        menu3 = document.getElementById('menu3'),
        menu7 = document.getElementById('menu7');

    menu1.classList.remove('animation');
    menu1.open(202, 35);
    menu1.classList.add('animation');
    window.scrollTo(0, 0);

    document.body.addEventListener('contextmenu', function (event) {
        const target = event.target;

        if (menu1Container.contains(target) || menu3Container.contains(target) || listMenu2Container.contains(target)) {
            event.preventDefault();
        }
    });

    document.addEventListener('mousedown', function (event) {
        if (!menu1.contains(event.target)) {
            menu1.close();
        }

        if (!menu3.contains(event.target)) {
            menu3.close();
        }

        if (!menu7.contains(event.target)) {
            menu7.close();
        }
    });

    menuTokens[0].addEventListener('mouseup', function (event) {
        menu1.open(202, 35);
    });

    menuTokens[7].addEventListener('mouseup', function (event) {
        menu7.open(202, 35);
    });

    menu3Container.addEventListener('mouseup', function (event) {
        const token = event.target.closest('.menu-token');

        if (token) {
            menu3.open(194, token.offsetTop);
        }
    });

    const stars = document.querySelectorAll('#listMenu4 .material-icons');

    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', function (event) {
            event.stopPropagation();

            if (this.classList.contains('empty')) {
                this.innerHTML = '&#xE838;';
                this.classList.remove('empty');
            }
            else {
                this.innerHTML = '&#xE83A;';
                this.classList.add('empty');
            }
        });
    }
}