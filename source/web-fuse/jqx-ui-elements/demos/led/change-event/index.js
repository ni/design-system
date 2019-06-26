window.onload = function () {
    const LED = document.querySelector("jqx-led"),
	log = document.querySelector("#log");
	
    log.textContent = false;

    LED.addEventListener('change', function (event) {
        const checkStatus = event.detail.value;
        log.textContent = checkStatus;
    });
};