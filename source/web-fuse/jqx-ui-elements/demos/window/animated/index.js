window.onload = function () {
    const jqxWindow = document.querySelector('jqx-window');
    let direction;

    document.getElementById('openButton').addEventListener('click', function () {
        jqxWindow.classList.remove('leftToRight');
        jqxWindow.classList.remove('topToBottom');
        jqxWindow.classList.remove('outOfButton');

        if (direction) {
            jqxWindow.classList.add(direction);
        }

        jqxWindow.open(this);
    });

    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function () {
        direction = 'leftToRight';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function () {
        direction = 'topToBottom';
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function () {
        direction = 'outOfButton';
    });

    document.getElementsByTagName('jqx-radio-button')[3].addEventListener('change', function () {
        direction = '';
    });
}