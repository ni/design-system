window.onload = function () {
    const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
        dropDownList = document.querySelector('jqx-drop-down-list');

    jqxDockingLayout.layout = [
        {
            type: 'LayoutGroup',
            orientation: 'horizontal',
            items: [
                {
                    id: 'tab0',
                    type: 'LayoutPanel',
                    label: 'Tabs 0',
                    size: '65%',
                    items: [{
                        label: 'Tab 0',
                        content: 'Content of Tab 0'
                    }]
                },
                {
                    id: 'tab1',
                    type: 'LayoutPanel',
                    label: 'Tabs 1',
                    items: [{
                        label: 'Tab 1',
                        content: 'Content of Tab 1'
                    }]
                }
            ]
        },
        {
            type: 'LayoutGroup',
            orientation: 'horizontal',
            items: [
                {
                    id: 'tab2',
                    type: 'LayoutPanel',
                    label: 'Tabs 2',
                    size: '25%',
                    items: [{
                        label: 'Tab 2',
                        content: 'Content of Tab 2'
                    }]
                },
                {
                    id: 'tab3',
                    type: 'LayoutPanel',
                    label: 'Tabs 3',
                    items: [{
                        label: 'Tab 3',
                        content: 'Content of Tab 3',
                    }]
                }
            ]
        }
    ];

    document.getElementById('remove').addEventListener('click', function () {
        jqxDockingLayout.remove(document.getElementById(dropDownList.selectedValues[0]));
        dropDownList.remove(dropDownList.selectedIndexes[0]);
    });
}