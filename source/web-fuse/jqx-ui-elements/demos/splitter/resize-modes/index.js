window.onload = function () {
    const radioButtons = document.getElementsByTagName('jqx-radio-button'),
	splitter = document.querySelector('jqx-splitter');

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', function (event) {
            document.querySelector('jqx-splitter').resizeMode = this.textContent.trim();
        });
    }
}