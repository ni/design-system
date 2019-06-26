window.onload = function () {
    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function () {
        document.getElementById('tooltip').position = 'top';
        document.getElementById('tooltip2').position = 'top';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function () {
        document.getElementById('tooltip').position = 'bottom';
        document.getElementById('tooltip2').position = 'bottom';
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function () {
        document.getElementById('tooltip').position = 'left';
        document.getElementById('tooltip2').position = 'left';
    });
    document.getElementsByTagName('jqx-radio-button')[3].addEventListener('change', function () {
        document.getElementById('tooltip').position = 'right';
        document.getElementById('tooltip2').position = 'right';
    });

    document.getElementById('tooltip').innerHTML = 'Progress: ' + document.querySelector('jqx-progress-bar').value + '%';
    document.getElementById('tooltip2').innerHTML = 'Progress: ' + document.querySelector('jqx-circular-progress-bar').value + '%';
}