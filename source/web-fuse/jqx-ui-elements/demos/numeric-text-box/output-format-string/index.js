window.onload = function () {
    const numericTextBox = document.getElementsByTagName('jqx-numeric-text-box')[0],
        radioButtons = document.getElementsByTagName('jqx-radio-button');

    radioButtons[0].addEventListener('change', function (event) {
        numericTextBox.outputFormatString = 'U2';
    });

    radioButtons[1].addEventListener('change', function (event) {
        numericTextBox.outputFormatString = 'Value: [ #.# ]';
    });

    radioButtons[2].addEventListener('change', function (event) {
        numericTextBox.outputFormatString = null;
    });
}
