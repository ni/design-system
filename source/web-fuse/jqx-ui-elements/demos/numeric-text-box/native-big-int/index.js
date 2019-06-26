window.onload = function () {
    const numericTextBox = document.getElementsByTagName('jqx-numeric-text-box')[0];

    document.getElementsByTagName('jqx-toggle-button')[0].addEventListener('change', function (event) {
        JQX.Utilities.BigNumber.ignoreBigIntNativeSupport = !event.detail.value;
        numericTextBox.opened = true;
    });

    setInterval(function () {
        numericTextBox.value = new JQX.Utilities.BigNumber(numericTextBox.value).subtract(1);
    }, 10);
}
