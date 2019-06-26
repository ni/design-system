let newFilterBuildersList = [];

// appends 100 FilterBuilders on the page
function appendFilterBuilders() {
    const filterBuildersContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newFilterBuilder = document.createElement('jqx-filter-builder');

        newFilterBuilder.classList.add('testFilterBuilder');
        newFilterBuilder.fields = [{ label: 'id', dataField: 'id', dataType: 'number' }, { label: 'Product', dataField: 'productName', dataType: 'string' }];
        newFilterBuildersList.push(newFilterBuilder);
        containerFragment.appendChild(newFilterBuilder);
    }

    filterBuildersContainer.appendChild(containerFragment);
    document.body.appendChild(filterBuildersContainer);
}

// executes value updates for all FilterBuilders in a 10ms loop
function runTest() {
    const values = [[['id', '>', 5], 'and', ['id', '<', 15]], [['id', '>', 5], 'and', ['productName', '=', 'product 1']], [['productName', '=', 'product 1'], 'and', ['productName', '=', 'product 2']]];
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            newFilterBuildersList[i].value = values[Math.round(Math.random() * 2)];
        }
    }, 10);
}

window.onload = function () {
    appendFilterBuilders();

    runTest();
};