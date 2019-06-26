window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        leds = document.querySelectorAll('jqx-led'),
        led = leds[0],
        ledSquare = leds[1];

    slider.addEventListener('change', function (event) {
        const value = slider.value;
        led.style.width = led.style.height = value + 'px';
        ledSquare.style.width = ledSquare.style.height = value + 'px';
    });

    led.style.width = led.style.height = '100px';
    ledSquare.style.width = ledSquare.style.height = '100px';
};