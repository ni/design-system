window.onload = function () {
    const draw = new JQX.Utilities.Draw(document.getElementById('container'));

    const firstCircleParameters = { stroke: 'red', fill: 'white' };
    firstCircleParameters['stroke-width'] = '20px';
    draw.circle(150, 150, 100, firstCircleParameters);

    const secondCircleParameters = { stroke: 'blue', fill: 'white' };
    secondCircleParameters['stroke-width'] = '20px';
    draw.circle(150, 150, 50, secondCircleParameters);

    const thirdCircleParameters = { fill: 'red' };
    draw.circle(150, 150, 20, thirdCircleParameters);
}