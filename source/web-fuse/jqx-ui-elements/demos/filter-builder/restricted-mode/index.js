window.onload = function () {
    const filterBuilder = document.querySelector('jqx-filter-builder'),
        filterQueryBox = document.getElementById('filterQueryBox');

    filterBuilder.fields = [
        { label: 'Product', dataField: 'productName', dataType: 'string' },
        { label: 'Quantity', dataField: 'quantity', dataType: 'number' },
        { label: 'Unit Price', dataField: 'price', dataType: 'string' },
        { label: 'Total', dataField: 'total', dataType: 'number' },
        { label: 'ShippedDate', dataField: 'shippedDate', dataType: 'date' },
        { label: 'ShippedTime', dataField: 'shippedTime', dataType: 'datetime' },
        { label: 'Ready', dataField: 'ready', dataType: 'boolean' }
    ];

    filterBuilder.addEventListener('change', function () {
        filterQueryBox.innerHTML = JSON.stringify(filterBuilder.value, null, "\t\t");
    });
}
