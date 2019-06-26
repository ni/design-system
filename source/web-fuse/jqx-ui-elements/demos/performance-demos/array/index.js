let source = {};

source.numeric = [100, 640, 333, 11, 0.6, 33, 90, 89000, 1, 100, 4, 444, 555, 2.123, 3.14];
source.string = ['Jaguar', 'Penguin', 'Sherlock', 'Barrel', 'Possum', 'Sun', 'Milan', 'Face', 'Samuel', 'Supernatural', 'Bobby'];

function generateRandomValue(type) {
    let value = [];

    for (let i = 0; i < 10; i++) {
        value.push([]);

        for (let j = 0; j < 10; j++) {
            value[i][j] = source[type][Math.floor(Math.random() * source[type].length)];
        }
    }

    return value;
}

function runTest() {
    setInterval(function () {
        jqxArrayNumeric.value = generateRandomValue('numeric');
        jqxArrayString.value = generateRandomValue('string');
    }, 10);
}

window.onload = function () {
    const jqxArrayNumeric = document.getElementById('jqxArrayNumeric'),
        jqxArrayString = document.getElementById('jqxArrayString');

    runTest();
}