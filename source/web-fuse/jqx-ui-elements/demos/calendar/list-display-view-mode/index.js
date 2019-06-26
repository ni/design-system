window.onload = function () {
    const calendar = document.querySelector('jqx-calendar');

    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.displayMode = 'month';
        }
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.displayMode = 'year';
        }
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function (event) {
        if (event.detail.value) {
            calendar.displayMode = 'decade';
        }
    });

    calendar.addEventListener('displayModeChange', function (event) {
        if (this.displayMode === 'month') {
            document.getElementsByTagName('jqx-radio-button')[0].checked = true;
            //document.getElementsByTagName('jqx-radio-button')[1].checked = false;
            //document.getElementsByTagName('jqx-radio-button')[2].checked = false;
        }
        else if (this.displayMode === 'year') {
            //document.getElementsByTagName('jqx-radio-button')[0].checked = false;
            document.getElementsByTagName('jqx-radio-button')[1].checked = true;
            //document.getElementsByTagName('jqx-radio-button')[2].checked = false;
        }
        else {
            //document.getElementsByTagName('jqx-radio-button')[0].checked = false;
            //document.getElementsByTagName('jqx-radio-button')[1].checked = false;
            document.getElementsByTagName('jqx-radio-button')[2].checked = true;
        }
    });
}