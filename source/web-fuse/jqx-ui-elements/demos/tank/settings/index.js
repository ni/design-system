window.onload = function () {
    const tanks = ['horizontalTank', 'verticalTank', 'invertedHorizontalTank', 'invertedVerticalTank'],
        checkboxShowUnit = document.getElementById('checkboxShowUnit'),
        checkboxScaleType = document.getElementById('checkboxScaleType'),
        numericTextBox = document.getElementById('numericTextBox1');
    let value;

    numericTextBox.addEventListener('change', function (event) {
        value = event.detail.value;
        for (let i = 0; i < tanks.length; i++) {
            const tank = document.getElementById(tanks[i]);

            tank.value = value;
        }
    });

    checkboxShowUnit.addEventListener('change', function () {
        for (let i = 0; i < tanks.length; i++) {
            const tank = document.getElementById(tanks[i]);

            tank.showUnit = checkboxShowUnit.checked;
        }
    });
    checkboxScaleType.addEventListener('change', function () {
        for (let i = 0; i < tanks.length; i++) {
            const tank = document.getElementById(tanks[i]);

            if (checkboxScaleType.checked) {
                tank.scaleType = 'integer';
            }
            else {
                tank.scaleType = 'floatingPoint';
            }
        }
    });
}