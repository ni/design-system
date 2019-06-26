window.onload = function () {
    const buttons = document.querySelectorAll("jqx-radio-button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('change', function (event) {
            const checkStatus = event.detail.value;

            if (checkStatus) {
                document.body.className = event.target.value;
            }
        });
    }
}