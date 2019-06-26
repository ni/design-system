window.onload = function () {
    const splitter0 = document.getElementById('splitter0'),
	splitter1 = document.getElementById('splitter1'),
	splitter2 = document.getElementById('splitter2');

    splitter0.dataSource = [
        {
            id: 'item00',
            collapsible: true,
            content: `Left Pane`
        },
        {
            id: 'item01',
            content: '<jqx-splitter id="nestedSplitter0" orientation="horizontal">' +
                            '<jqx-splitter-item collapsible id="item02" collapsible>Nested Splitter Top Pane</jqx-splitter-item>' +
                            '<jqx-splitter-item id="item03">Nested Splitter Bottom Content</jqx-splitter-item>' +
                        '</jqx-splitter>'
        }
    ];
    splitter1.dataSource = [
        {
            id: 'item10',
            collapsible: true,
            content: `Left Pane`
        },
        {
            id: 'item11',
            content: '<jqx-splitter id="nestedSplitter1">' +
                            '<jqx-splitter-item collapsible id="item12" collapsible>Nested Splitter Top Pane</jqx-splitter-item>' +
                            '<jqx-splitter-item id="item13">Nested Splitter Bottom Pane</jqx-splitter-item>' +
                        '</jqx-splitter>'
        }
    ];


    splitter2.dataSource = [
        {
            id: 'item20',
            collapsible: true,
            content: `Left Pane`
        },
        {
            id: 'item21',
            content: '<jqx-splitter id="nestedSplitter2" orientation="horizontal">' +
                                        '<jqx-splitter-item collapsible id="item22" collapsible>Nested Splitter Top Pane</jqx-splitter-item>' +
                                        '<jqx-splitter-item id="item23">Nested Splitter Bottom Pane</jqx-splitter-item>' +
                                    '</jqx-splitter>'
        }
    ];
}