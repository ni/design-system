window.onload = function () {
    const filterBuilder = document.querySelector('jqx-filter-builder'),
        filterQueryBox = document.getElementById('filterQueryBox');

    filterBuilder.customOperations = [{
        name: "anyof",
        label: "Is any of",
        useValue: true,
        editorTemplate: function (fieldType, value, fieldData) {
            const editor1 = document.createElement('jqx-text-box'),
                editor2 = document.createElement('jqx-text-box'),
                container = document.createElement('div');

            value = value.split(',');
            editor1.value = value[0];
            editor2.value = value[1] || '';

            editor1.id = 'editor1';
            editor2.id = 'editor2';

            container.appendChild(editor1);
            container.appendChild(editor2);

            return container;
        },
        valueTemplate: function (editor) {
            const editors = editor.querySelectorAll('jqx-text-box');

            return editors[0].value + ', ' + editors[1].value;
        },
        handleValue: function (editor) {
            const editors = editor.querySelectorAll('jqx-text-box');
            let value = [];

            for (let i = 0; i < editors.length; i++) {
                value.push(editors[i].value);
            }

            return value;
        }
    },
    {
        name: "/ab+c/",
        label: "Regex /ab+c/",
        hideValue: true
    }];

    filterBuilder.fields = [
        { label: 'id', dataField: 'id', dataType: 'number' },
        { label: 'Product', dataField: 'productName', dataType: 'string', filterOperations: ["=", ">", "anyof", "/ab+c/"] },
    ];

    filterBuilder.value = [
        ["id", "=", 5],
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
