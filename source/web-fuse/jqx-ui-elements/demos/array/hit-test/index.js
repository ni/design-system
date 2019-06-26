window.onload = function () {
    const jqxArray = document.getElementById('jqxArray');

    document.getElementById('toggleElementGap').addEventListener('click', function () {
        jqxArray.toggleElementGap();
    });

    document.body.addEventListener('click', function (event) {
        const hitTest = jqxArray.hitTest(event.pageX, event.pageY);
        let out;

        if (hitTest) {
            switch (hitTest.type) {
                case 'element':
                    out = 'Clicked on: ' + hitTest.type + ', x: ' + hitTest.column + ', y: ' + hitTest.row;
                    break;
                case 'indexer':
                    out = 'Clicked on: ' + hitTest.type + ', dimension: ' + hitTest.dimension;
                    break;
                case 'array':
                    out = 'Clicked on: ' + hitTest.type;
                    break;
            }

            alert(out);
        }
    });
};