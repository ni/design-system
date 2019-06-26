window.onload = function () {
    const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
        dropDownList = document.querySelector('jqx-drop-down-list');

    jqxDockingLayout.layout = [
        {
            type: 'LayoutPanel',
            items: [{
                id: 'A',
                label: 'A',
                content: 'Content of item with id #itemA',
                selected: true
            }],
            autoHide: true,
            autoHidePosition: 'top'
        },
        {
            type: 'LayoutPanel',
            items: [{
                id: 'B',
                label: 'B',
                content: 'Content of item with id #itemB',
            }],
            autoHide: true,
            autoHidePosition: 'left'
        },
        {
            type: 'LayoutPanel',
            items: [{
                id: 'C',
                label: 'C',
                content: 'Content of item with id #itemC'
            }],
            autoHide: true,
            autoHidePosition: 'right'
        },
        {
            type: 'LayoutPanel',
            items: [{
                id: 'D',
                label: 'D',
                content: 'Content of item with id #itemD',
            }],
            autoHide: true,
            autoHidePosition: 'bottom'
        }
    ];

    const input = document.getElementById('indexInput'),
        inputPosition = document.getElementById('positionInput');

    document.getElementById('dock').addEventListener('click', function () {
        jqxDockingLayout.dock(dropDownList.selectedValues[0]);
    });

    document.getElementById('undock').addEventListener('click', function () {
        jqxDockingLayout.undock(dropDownList.selectedValues[0]);
    });
}