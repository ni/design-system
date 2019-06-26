window.onload = function () {
    document.querySelector('jqx-drop-down-list').dataSource =
        [
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
            "Alabala",
            "Indian filter coffee",
            "Instant coffee",
            "Irish coffee",
            "Liqueur coffee"
        ];

    document.getElementsByTagName('jqx-radio-button')[0].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownPosition = 'bottom';
    });

    document.getElementsByTagName('jqx-radio-button')[1].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownPosition = 'overlay-center';
    });

    document.getElementsByTagName('jqx-radio-button')[2].addEventListener('change', function () {
        document.querySelector('jqx-drop-down-list').dropDownPosition = 'top';
    });
}