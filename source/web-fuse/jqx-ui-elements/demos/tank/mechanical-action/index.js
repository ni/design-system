window.onload = function () {
    const tanks = ['jqxTank1', 'jqxTank2', 'jqxTank3'];

    for (let i = 0; i < tanks.length; i++) {
        const tank = document.getElementById(tanks[i]);

        tank.addEventListener('change', function (event) {
            const value = event.detail.value,
                id = this.id;

            document.getElementById(id + 'Value').innerHTML = parseFloat(value).toFixed(2);
        });
    }
};