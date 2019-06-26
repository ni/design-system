window.onload = function () {
    const multiSplitButton = document.getElementById('multiSplitButton');

    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'bottom';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'overlay-bottom';
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'overlay-center';
    });

    document.getElementsByTagName('jqx-radio-button')[3].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'overlay-top';
    });

    document.getElementsByTagName('jqx-radio-button')[4].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'top';
    });

    document.getElementsByTagName('jqx-radio-button')[5].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'center-bottom';
    });

    document.getElementsByTagName('jqx-radio-button')[6].addEventListener('change', function () {
        multiSplitButton.dropDownPosition = 'center-top';
    });
}