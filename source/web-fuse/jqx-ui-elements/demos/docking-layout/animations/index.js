window.onload = function () {
    document.querySelector('jqx-docking-layout').layout = [
        {
            id: 'item1',
            label: 'Tabs 1',
            items: [{
                label: 'Tab 1',
                content: 'Content of Tab 1'
            },
            {
                label: 'Tab 2',
                content: 'Content of Tab 2'
            }
            ],
            autoHide: true,
            autoHidePosition: 'top'
        },
        {
            id: 'item2',
            label: 'Tabs 2',
            items: [{
                label: 'Tab 3',
                content: 'Content of Tab 3'
            },
            {
                label: 'Tab 4',
                content: 'Content of Tab 4'
            }
            ],
            autoHide: true,
            autoHidePosition: 'right'
        },
        {
            id: 'item3',
            label: 'Tabs 3',
            items: [{
                label: 'Tab 5',
                content: 'Content of Tab 5'
            }, {
                label: 'Tab 6',
                content: 'Content of Tab 6'
            },
            {
                label: 'Tab 7',
                content: 'Content of Tab 7'
            },
            {
                label: 'Tab 8',
                content: 'Content of Tab 8'
            }]
        },
        {
            id: 'item4',
            label: 'Tabs 4',
            items: [{
                label: 'Tab 9',
                content: 'Content of Tab 9'
            },
            {
                label: 'Tab 10',
                content: 'Content of Tab 10'
            }
            ],
            autoHide: true,
            autoHidePosition: 'bottom'
        },
        {
            id: 'item5',
            label: 'Tabs 5',
            items: [{
                label: 'Tab 11',
                content: 'Content of Tab 11'
            },
            {
                label: 'Tab 12',
                content: 'Content of Tab 12'
            }
            ],
            autoHide: true,
            autoHidePosition: 'left'
        }
    ];
};