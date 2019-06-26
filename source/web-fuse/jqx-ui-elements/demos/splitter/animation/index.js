window.onload = function () {
    var splitter = document.querySelector('jqx-splitter');

    splitter.dataSource = [
        {
            id: 'item0',
            content: '<jqx-splitter class="animation">' +
            '<jqx-splitter-item collapsible id="item1">Item 1</jqx-splitter-item>' +
            '<jqx-splitter-item id="item2">Item 2</jqx-splitter-item>' +
            '<jqx-splitter-item collapsible id="item3">Item 3</jqx-splitter-item>' +
            '</jqx-splitter>'
        },
        {
            id: 'item4',
            content: 'Item 4',
            collapsible: true
        },
        {
            id: 'item5',
            content: 'Item 5',
            collapsible: true
        }
    ];

    //Lock the last splitterBar
    splitter.lockBar(splitter.bars.length - 1);
}