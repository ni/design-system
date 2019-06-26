window.onload = function () {
    const comboBox = document.querySelector('jqx-combo-box');

    comboBox.dataSource =
        [{
            label: "Andrew",
            value: 1,
            group: "A"
        },
        {
            label: "Natalia",
            value: 5,
            group: "B"
        },
        {
            label: "Michael",
            value: 4,
            group: "B"
        },
        {
            label: "Angel",
            value: 2,
            group: "A"
        },
        {
            label: "Hristo",
            value: 6,
            group: "C"
        },
       {
           label: "Peter",
           value: 3,
           group: "A"
       },
       {
           label: "Albert",
           value: 3,
           group: "A"
       },
       {
           label: "Boyko",
           value: 7,
           group: "A"
       },
       {
           label: "Dimitar",
           value: 3,
           group: "B"
       },
       {
           label: "George",
           value: 25,
           group: "C"
       }];

    document.getElementsByTagName('jqx-button')[0].addEventListener('click', function () {
        comboBox.dropDownOpenMode = 'default';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });

    document.getElementsByTagName('jqx-button')[1].addEventListener('click', function () {
        comboBox.dropDownOpenMode = 'auto';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });

    document.getElementsByTagName('jqx-button')[2].addEventListener('click', function () {
        comboBox.dropDownOpenMode = 'dropDownButton';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });

    document.getElementsByTagName('jqx-button')[3].addEventListener('click', function () {
        comboBox.dropDownOpenMode = 'none';

        const buttons = document.getElementsByTagName('jqx-button');

        for (let b = 0; b < buttons.length ; b++) {
            buttons[b].disabled = buttons[b] === this ? true : false;
        }
    });
}