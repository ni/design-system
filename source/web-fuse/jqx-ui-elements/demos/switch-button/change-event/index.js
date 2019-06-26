window.onload = function () {
    const jqxSwitchButton = document.querySelector("jqx-switch-button"),
	log = document.querySelector("#log");
	
    log.textContent = false;

    jqxSwitchButton.addEventListener('change', function (event) {
        const checkStatus = event.detail.value;
        log.textContent = checkStatus;
    });
};