window.onload = function () {
    const splitter = document.querySelector('jqx-splitter');

    splitter.dataSource = [
        {
            id: 'item0',
            content: '<jqx-splitter>' +
                        '<jqx-splitter-item collapsible id="item1">Item 1</jqx-splitter-item>' +
                        '<jqx-splitter-item id="item2">Item 2</jqx-splitter-item>' +
                        '<jqx-splitter-item collapsible id="item3">Item 3</jqx-splitter-item>' +
                     '</jqx-splitter>'
        },
        {
            id: 'item4',
            content: 'Item 4',
        },
        {
            id: 'item5',
            content: 'Item 5'
        }
    ];

    splitter.lockBar(splitter.bars.length - 1);
}