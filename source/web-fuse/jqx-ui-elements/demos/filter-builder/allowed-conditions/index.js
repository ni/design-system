window.onload = function () {
    const filterBuilder = document.querySelector('jqx-filter-builder'),
        filterQueryBox = document.getElementById('filterQueryBox');

    filterBuilder.fields = [
        { label: 'id', dataField: 'id', dataType: 'number', filterOperations: ["=", "anyof"] },
        { label: 'Product', dataField: 'productName', dataType: 'string', lookup: { dataSource: ["Televisions", "Monitors", "Projectors"] } },
        { label: 'Quantity', dataField: 'quantity', dataType: 'number' },
        { label: 'Unit Price', dataField: 'price', dataType: 'string' },
        { label: 'Total', dataField: 'total', dataType: 'number' },
        { label: 'ShippedDate', dataField: 'shippedDate', dataType: 'date' },
        { label: 'ShippedTime', dataField: 'shippedTime', dataType: 'datetime' },
        { label: 'Ready', dataField: 'ready', dataType: 'boolean' }
    ];

    filterBuilder.value = [
        ["productName", "=", "Projector PlusHD"],
        "or",
        [
            ["productName", "=", "Monitors"],
            "and",
            ["price", "<", 1300],

        ],
        [
            ["productName", "=", "Televisions"],
            "and",
            ["price", "<", 4000]
        ]
    ];


    filterBuilder.addEventListener('change', function () {
        filterQueryBox.innerHTML = JSON.stringify(filterBuilder.value, null, "\t\t");
    });
}