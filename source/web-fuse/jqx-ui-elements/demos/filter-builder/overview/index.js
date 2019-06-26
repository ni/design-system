window.onload = function () {
    const filterBuilder = document.querySelector('jqx-filter-builder');

    filterBuilder.fields = [
        { label: 'id', dataField: 'id', dataType: 'number', filterOperations: ["=", ">", "<"] },
        { label: 'Product', dataField: 'productName', dataType: 'string' },
        { label: 'Unit Price', dataField: 'price', dataType: 'number' },
        { label: 'Total', dataField: 'total', dataType: 'number' },
        { label: 'Active', dataField: 'active', dataType: 'boolean', filterOperations: ["=", ">", "<"] }
    ];
}