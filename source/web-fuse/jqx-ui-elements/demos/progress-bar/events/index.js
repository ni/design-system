window.onload = function () {
    const el = document.querySelector("jqx-progress-bar");
    el.addEventListener('change', function (event) {
        const newV = event.detail.value,
            oldV = event.detail.oldValue;
        document.getElementById('log').innerHTML = '"change" event has been raised.' + '<br/><br/>' + 'Event Details:' + '<br/>' + 'newValue:' + newV + '<br/>' + 'oldValue: ' + oldV;
    });
};

function setVal(number) {
    const customElement = document.querySelector("jqx-progress-bar");
    customElement.value = number;
}