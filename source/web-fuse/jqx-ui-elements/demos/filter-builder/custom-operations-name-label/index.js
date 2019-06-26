window.onload = function () {
    const filterBuilder = document.querySelector('jqx-filter-builder'),
        filterQueryBox = document.getElementById('filterQueryBox');

    filterBuilder.customOperations = [
        {
            name: "isBefore",
            label: "Is Before"
        },
        {
            name: "isAfter",
            label: "Is After"
        },
        {
            name: "isOnOrBefore",
            label: "Is On Or Before"
        },
        {
            name: "isOnOrAfter",
            label: "Is On Or After"
        }];

    filterBuilder.fields = [
        { label: 'Start Date', dataField: 'startDate', dataType: 'datetime', filterOperations: ["isBefore", "isAfter", "isOnOrBefore", "isOnOrAfter"] },
        { label: 'End Date', dataField: 'endDate', dataType: 'datetime', filterOperations: ["isBefore", "isAfter", "isOnOrBefore", "isOnOrAfter"] },
    ];

    filterBuilder.addEventListener('change', function () {
        filterQueryBox.innerHTML = JSON.stringify(filterBuilder.value, null, "\t\t");
    });

}