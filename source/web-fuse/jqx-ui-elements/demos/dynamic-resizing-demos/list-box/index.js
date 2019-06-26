window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        listbox = document.getElementsByTagName("jqx-list-box")[0],
        source = [
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
    listbox.dataSource = source;
    slider.addEventListener('change', function (event) {
        const value = slider.value;
        listbox.style.width = value / 2 + 'px';
        listbox.style.height = value + 'px';
    });
};