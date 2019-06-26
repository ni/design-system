window.onload = function () {
    const hoverArea = document.getElementById('hover-area'),
        floatingHoverButton = document.getElementById('floating-hover-action'),
        floatingClickButton = document.getElementById('floating-click-action'),
        toggleButtons = document.getElementsByClassName('exclusive-selection'),
        progressBar = document.getElementById('progressBar'),
        circularProgressBar = document.getElementById('progressBarCircular'),
        multiSplitButtonLight = document.getElementById('multiSplitButtonLight'),
        multiSplitButtonDark = document.getElementById('multiSplitButtonDark');

    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].addEventListener('change', function (event) {
            if (event.detail.value) {
                for (let k = 0; k < toggleButtons.length; k++) {
                    if (toggleButtons[k] !== this) {
                        toggleButtons[k].checked = false;
                    }
                }
            }
        });
    }

    hoverArea.addEventListener('mouseover', function () {
        floatingHoverButton.$.removeClass('jqx-visibility-hidden');
    });

    hoverArea.addEventListener('mouseout', function (event) {
        if (event.relatedTarget.closest('jqx-button')) {
            return;
        }

        floatingHoverButton.$.addClass('jqx-visibility-hidden');
    });

    floatingClickButton.addEventListener('click', function () {
        const subMenuButtons = document.getElementsByClassName('floating-click-sub-action');
        let changeIcon = false;

        for (let i = 0; i < subMenuButtons.length; i++) {
            if (subMenuButtons[i].$.hasClass('jqx-visibility-hidden')) {
                subMenuButtons[i].$.removeClass('jqx-visibility-hidden');
                changeIcon = true;
            }
            else {
                subMenuButtons[i].$.addClass('jqx-visibility-hidden');
            }
        }

        this.getElementsByClassName('material-icons')[0].innerHTML = changeIcon ? 'close' : 'share';
    });

    document.getElementById('progressUp').addEventListener('click', function () {
        progressBar.value = Math.min(progressBar.max, progressBar.value + 1);
        circularProgressBar.value = Math.min(circularProgressBar.max, circularProgressBar.value + 1);
    });

    document.getElementById('progressDown').addEventListener('click', function () {
        progressBar.value = Math.max(progressBar.min, progressBar.value - 1);
        circularProgressBar.value = Math.max(circularProgressBar.min, circularProgressBar.value - 1);
    });

    document.getElementById('incrementButton').addEventListener('click', function () {
        const progressBar = document.getElementById('progressBarCircularControl');

        progressBar.value = Math.min(progressBar.max, progressBar.value + 1);

    });

    document.getElementById('decrementButton').addEventListener('click', function () {
        const progressBar = document.getElementById('progressBarCircularControl');

        progressBar.value = Math.max(progressBar.min, progressBar.value - 1);
    });

    document.getElementById('decrementButton2').addEventListener('click', function () {
        const progressBar = document.getElementById('progressBarCircularControl2');

        progressBar.value = Math.min(progressBar.max, progressBar.value + 1);

    });

    document.getElementById('incrementButton2').addEventListener('click', function () {
        const progressBar = document.getElementById('progressBarCircularControl2');

        progressBar.value = Math.max(progressBar.min, progressBar.value - 1);
    });

    document.getElementById('powerButtonAnimation').addEventListener('change', function (event) {
        document.getElementById('progressBarAnimated').indeterminate = event.detail.value ? false : true;
    });

    multiSplitButtonLight.dataSource = [{ "value": "1", "label": "Sony", "button": true }, { "value": "2", "label": "Philips", "button": true }, { "value": "3", "label": "Panasonic" }, { "value": "4", "label": "Sharp" }, { "value": "5", "label": "Samsung" }, { "value": "6", "label": "LG" }, { "value": "7", "label": "JVC" }];
    multiSplitButtonDark.dataSource = [{ "value": "1", "label": "Sony", "button": true }, { "value": "2", "label": "Philips", "button": true }, { "value": "3", "label": "Panasonic" }, { "value": "4", "label": "Sharp" }, { "value": "5", "label": "Samsung" }, { "value": "6", "label": "LG" }, { "value": "7", "label": "JVC" }];
}