window.onload = function () {
    const powerButton = document.querySelector('jqx-power-button');
    powerButton.setAttribute('checked', 'false');

    console.log(powerButton.checked);
}