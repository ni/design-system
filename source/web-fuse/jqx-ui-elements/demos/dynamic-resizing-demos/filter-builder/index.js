window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        jqxFilterBuilder = document.querySelector('jqx-filter-builder');

    jqxFilterBuilder.fields = [
        { label: 'id', dataField: 'id', dataType: 'number' },
        { label: 'Product', dataField: 'productName', dataType: 'string' }
    ];

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        jqxFilterBuilder.style.width = size + 'px';
        jqxFilterBuilder.style.height = size / 2 + 'px';
    });
};