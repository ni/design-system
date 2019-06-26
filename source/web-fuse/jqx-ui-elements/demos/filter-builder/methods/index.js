window.onload = function () {
    const filterBuilder = document.querySelector('jqx-filter-builder'),
        addPosition = document.getElementById('addPosition'),
        addGroupRule = document.getElementById('addGroupRule'),
        addGroupButton = document.getElementById('addGroupButton'),
        updateGroupButton = document.getElementById('updateGroupButton'),
        removeGroupButton = document.getElementById('removeGroupButton'),
        addConditionField = document.getElementById('addConditionField'),
        addConditionRule = document.getElementById('addConditionRule'),
        addConditionValue = document.getElementById('addConditionValue'),
        addConditionButton = document.getElementById('addConditionButton'),
        updateConditionButton = document.getElementById('updateConditionButton'),
        removeConditionButton = document.getElementById('removeConditionButton'),
        valueToString = document.getElementById('valueToString'),
        toStringButton = document.getElementById('toStringButton');

    filterBuilder.fields = [
        { label: 'id', dataField: 'id', dataType: 'number', filterOperations: ["=", ">", "<"] },
        { label: 'Product', dataField: 'productName', dataType: 'string' },
        { label: 'Unit Price', dataField: 'price', dataType: 'string' },
        { label: 'Total', dataField: 'total', dataType: 'number' },
        { label: 'Active', dataField: 'active', dataType: 'boolean', filterOperations: ["=", ">", "<"] }
    ];

    valueToString.label = 'Value To String';

    filterBuilder.value = [
        ["productName", "=", "Projector PlusHD"],
        "or",
        [
            ["productName", "=", "Monitors"],
            "and",
            ["price", "<", 1300]

        ],
        [
            ["productName", "=", "Televisions"],
            "and",
            ["price", "<", 4000]
        ]
    ];

    addConditionField.dataSource = [
        { "label": "id", "value": "id" },
        { "label": "Product", "value": "productName" },
        { "label": "Unit Price", "value": "price" },
        { "label": "Total", "value": "total" },
        { "label": "Active", "value": "active" }
    ];

    addConditionRule.dataSource = [
        { "label": "Equals", "value": "=" },
        { "label": "Does not equal", "value": "<>" },
        { "label": "Greater than", "value": ">" },
        { "label": "Greater than or equal to", "value": ">=" },
        { "label": "Less than", "value": "<" },
        { "label": "Less than or equal to", "value": "<=" },
        { "label": "Between", "value": "between" },
        { "label": "Starts with", "value": "startswith" },
        { "label": "Ends with", "value": "endswith" },
        { "label": "Contains", "value": "contains" },
        { "label": "Does not contain", "value": "notcontains" },
        { "label": "Is blank", "value": "isblank" },
        { "label": "Is not blank", "value": "isnotblank" }
    ];

    toStringButton.addEventListener('click', function () {
        valueToString.innerHTML = filterBuilder.toString();
        valueToString.open();
    });

    addGroupButton.addEventListener('click', function () {
        const position = addPosition.value,
            rule = addGroupRule.value;

        filterBuilder.addGroup(position, rule);
    });
    updateGroupButton.addEventListener('click', function () {
        const position = addPosition.value,
            rule = addGroupRule.value;

        filterBuilder.updateGroup(position, rule);
    });
    removeGroupButton.addEventListener('click', function () {
        const position = addPosition.value;

        filterBuilder.removeGroup(position);
    });

    addConditionButton.addEventListener('click', function () {
        const position = addPosition.value,
            conditionSettings = getConditionSettings();

        filterBuilder.addCondition(position, conditionSettings);
    });
    updateConditionButton.addEventListener('click', function () {
        const position = addPosition.value,
            conditionSettings = getConditionSettings();

        filterBuilder.updateCondition(position, conditionSettings);
    });
    removeConditionButton.addEventListener('click', function () {
        const position = addPosition.value;

        filterBuilder.removeCondition(position);
    });

    function getConditionSettings() {
        const field = addConditionField.selectedValues[0],
            rule = addConditionRule.selectedValues[0],
            value = addConditionValue.value;

        return [field, rule, value];
    }
}