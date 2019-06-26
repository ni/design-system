JQX('#queryBuilder', class {
    get properties() {
        return {
            allowDrag: true,
            fields: [
                { label: 'Id', dataField: 'id', dataType: 'number' },
                { label: 'Product', dataField: 'productName', dataType: 'string' },
                { label: 'Unit Price', dataField: 'price', dataType: 'number' },
                { label: 'Purchased', dataField: 'purchased', dataType: 'datetime' },
                { label: 'Available', dataField: 'available', dataType: 'boolean' }
            ],
            value: [
                [
                    ['purchased', '=', new Date(2019, 0, 4)],
                    'and',
                    ['productName', '<>', 'Monitors'],
                    'or',
                    ['productName', 'isblank']
                ],
                'and',
                [
                    ['available', '=', true],
                    'and',
                    ['price', '<', 1300],
                ],
                'or',
                [
                    ['productName', '=', 'Televisions'],
                    'and',
                    ['price', '<', 4000]
                ]
            ]
        }
    }
});

window.onload = function () {
    const queryBuilder = document.getElementById('queryBuilder'),
        slider = document.getElementById('horizontalSlider');

    slider.addEventListener('change', function () {
        const value = slider.value;

        queryBuilder.style.width = value + 'px';
        queryBuilder.style.height = parseFloat(value) + 200 + 'px';
    });
};
