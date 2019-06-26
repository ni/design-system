window.onload = function () {
    const checkBox = document.querySelector("jqx-check-box"),
	log = document.querySelector("#log");
    log.textContent = false;

    checkBox.addEventListener('change', function (event) {
        const checkStatus = event.detail.value;
        log.textContent = checkStatus;
    });
};