window.onload = function () {
    const draw = new JQX.Utilities.Draw(document.getElementById('container')),
        size = draw.getSize(),
        // some sample values
        values = [200, 1, 15, 100, 8, 200, 200, 200, 1, 15, 100, 8, 200, 200, 1, 15, 100, 8, 200, 200, 1, 15, 100, 8, 200, 1, 15, 100, 8, 200, 200, 1, 15, 100, 8, 200],
        // calaculate the values' range
        values_range = {
            min: draw.min(values),
            max: draw.max(values)
        };

    let x_prev = NaN,
        y_prev = NaN;

    for (let i = 0; i < values.length; i++) {
        // calculate the horizontal offset
        const x = draw.scale(
            i,                               // value
            { min: 0, max: values.length },  // horizontal range (from 0 to the number of elements)
            { min: 0, max: size.width }      // horizontal area size
        );

        // calculate the vertical offset
        const y = draw.scale(
            values[i],                                // value
            values_range,                             // vertical range (from min to max value)
            { min: 0, max: size.height, flip: true }  // vertical area size
         );

        if (isNaN(x_prev) || isNaN(y_prev)) {
            x_prev = x;
            y_prev = y;
        }

        // draw a line from the previous to the current point
        draw.line(x_prev, y_prev, x, y, { stroke: 'blue', 'stroke-width': 1 });

        x_prev = x;
        y_prev = y;
    }
}