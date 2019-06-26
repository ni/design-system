window.onload = function () {
    const chips = document.getElementsByTagName('jqx-chip'),
        evetLog = document.getElementById('eventLog');

    for (let i = 0; i < chips.length; i++) {
        const chip = chips[i];

        chip.addEventListener('click', function () {
            evetLog.innerHTML = evetLog.innerHTML + 'clicked <b>' + this.value + '</b>\'s chip<br />';
        });
        chip.addEventListener('close', function () {
            evetLog.innerHTML = evetLog.innerHTML + 'removed <b>' + this.value + '</b>\'s chip<br />';
        });
    }
}