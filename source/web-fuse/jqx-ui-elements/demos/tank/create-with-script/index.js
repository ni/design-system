window.onload = function () {
    const tank = document.createElement("jqx-tank");

    tank.value = "50";
    tank.orientation = "vertical";
    document.body.appendChild(tank);

    tank.focus();
}