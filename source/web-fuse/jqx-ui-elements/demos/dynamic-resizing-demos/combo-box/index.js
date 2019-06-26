window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        comboBox = document.querySelector('jqx-combo-box');

    comboBox.dataSource = [
           "Affogato",
           "Americano",
           "Bicerin",
           "Breve",
           "Café Bombón",
           "Café au lait",
           "Caffé Corretto",
           "Café Crema",
           "Caffé Latte",
           "Caffé macchiato",
           "Café mélange",
           "Coffee milk",
           "Cafe mocha",
           "Cappuccino",
           "Carajillo",
           "Cortado",
           "Cuban espresso",
           "Espresso",
           "Eiskaffee",
           "The Flat White",
           "Frappuccino",
           "Galao",
           "Greek frappé coffee",
           "Iced Coffee﻿",
           "Indian filter coffee",
           "Instant coffee",
           "Irish coffee",
           "Liqueur coffee"
    ];

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        comboBox.style.width = size + 'px';
        comboBox.style.height = size / 2 + 'px';
    });
};