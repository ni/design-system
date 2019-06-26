window.onload = function () {
    const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
        dropDownList = document.querySelector('jqx-drop-down-list');

    jqxDockingLayout.layout = [
        {
            id: 'tab1',
            type: 'LayoutPanel',
            label: 'Tabs 1',
            items: [{
                label: 'Tab 1',
                content: 'Content of Tab 1',
                selected: true
            }]
        },
        {
            id: 'tab2',
            type: 'LayoutPanel',
            label: 'Tabs 2',
            items: [{
                label: 'Tab 2',
                content: 'Content of Tab 2',
            }]
        },
        {
            id: 'tab3',
            type: 'LayoutPanel',
            label: 'Tabs 3',
            items: [{
                label: 'Tab 3',
                content: 'Content of Tab 3'
            }]
        }
    ];

    document.getElementById('update').addEventListener('click', function () {
        const targetItem = document.getElementById(dropDownList.selectedValues[0]);

        jqxDockingLayout.update(targetItem,
            {
                size: '250', label: targetItem.label + '- Updated',
                items: [{
                    index: 0, label: targetItem.items[0].label + ' - Updated',
                    content: targetItem.items[0].textContent + ' has been Updated!'
                }]
            });
    });
}