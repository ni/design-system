window.onload = function () {
    const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
        dropDownList = document.querySelector('jqx-drop-down-list');

    jqxDockingLayout.layout = [
        {
            type: 'LayoutGroup',
            orientation: 'horizontal',
            items: [
                {
                    type: 'LayoutPanel',
                    label: 'Window A',
                    items: [{
                        id: 'itemA',
                        label: '#itemA',
                        content: 'Content of item with id "itemA"'
                    }]
                },
                {
                    type: 'LayoutGroup',
                    id: 'verticalGroup',
                    orientation: 'vertical',
                    items: [
                        {
                            type: 'LayoutPanel',
                            label: 'Window B',
                            items: [{
                                id: 'itemB',
                                label: '#itemB',
                                content: 'Content of item with id "itemB"',
                            }]
                        },
                        {
                            type: 'LayoutPanel',
                            label: 'Window C',
                            items: [{
                                id: 'itemC',
                                label: '#itemC',
                                content: 'Content of item with id "itemC"'
                            }]
                        },
                    ]
                },
                {
                    type: 'LayoutPanel',
                    label: 'Window D',
                    items: [{
                        id: 'itemD',
                        label: '#itemD',
                        content: 'Content of item with id "itemD"',
                    }]
                }
            ]
        }
    ];

    document.getElementById('autoHideTop').addEventListener('click', function () {
        jqxDockingLayout.autoHideTop(dropDownList.selectedValues[0]);
    });

    document.getElementById('autoHideBottom').addEventListener('click', function () {
        jqxDockingLayout.autoHideBottom(dropDownList.selectedValues[0]);
    });

    document.getElementById('autoHideLeft').addEventListener('click', function () {
        jqxDockingLayout.autoHideLeft(dropDownList.selectedValues[0]);
    });

    document.getElementById('autoHideRight').addEventListener('click', function () {
        jqxDockingLayout.autoHideRight(dropDownList.selectedValues[0]);
    });
}