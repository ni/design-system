window.onload = function () {
    const buttons = document.getElementsByClassName('open-window-button'),
        cancelButtons = document.getElementsByClassName('flat'),
        progressWindows = document.getElementsByTagName('jqx-progress-window'); 
	let i;

    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (event) {
            this.nextElementSibling.open();
        });
    }

    for (i = 0; i < cancelButtons.length; i++) {
        cancelButtons[i].addEventListener('click', function (event) {
            if (this.ownerElement && (this.textContent.toLowerCase() === 'cancel' || this.textContent.toLowerCase() === 'disagree')) {
                this.ownerElement.close();
            }
        });
    }

    for (i = 0; i < progressWindows.length; i++) {
        progressWindows[i].addEventListener('click', function (event) {
            const that = this;

            if (!event.target.closest('.jqx-complete-button') || !that.opened) {
                return;
            }

            that.innerHTML = 'Loading...';
            that.value = 0;

            let interval = setInterval(function () {
                if (that.value >= that.max) {
                    that.innerHTML = 'Finished';
                    clearInterval(interval);
                }

                that.value += Math.random() * 10;
            }, 500);
        });
    }
}