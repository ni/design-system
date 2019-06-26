window.onload = function () {
    const textBox = document.querySelector('jqx-text-box'),
        button = document.querySelector('jqx-button'),
        label = ['One', 'Two', 'Three', 'Four', 'Five'];

    textBox.addEventListener('change', function (event) {
        document.getElementById('log').innerHTML += '<br>' + '<b>' + event.type + '</b>' + ' event fired with details: ' +
            'newValue: <b>' + event.detail.newValue + '</b>' + ', oldValue: <b>' + event.detail.oldValue + '</b>';
    });

    button.addEventListener('click', function () {
        const oldValue = textBox.value;

        textBox.value = label[Math.floor(Math.random() * Math.floor(5))];

        //Fire a 'change' event with details
        textBox.$.fireEvent('change', { newValue: textBox.value, oldValue: oldValue });
    });
}