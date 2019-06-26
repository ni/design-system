window.onload = function () {
    const gauge = document.getElementById('gauge');

    document.getElementById('testButton').addEventListener('click', function () {
        gauge.value = 50;
    });
}