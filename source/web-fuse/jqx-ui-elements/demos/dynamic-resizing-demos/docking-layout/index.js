window.onload = function () {
    const slider = document.querySelector('jqx-slider'),
        dockingLayout = document.querySelector('jqx-docking-layout');

    slider.addEventListener('change', function (event) {
        const value = slider.value;
        dockingLayout.style.width = value + 'px';
        dockingLayout.style.height = value + 'px';
    });

    dockingLayout.layout = [
        {
            type: 'LayoutPanel',
            label: 'Item 1',
            items: [
                {
                    label: 'Tab 1',
                    content: 'Content of Tab 1'
                },
                {
                    label: 'Tab 2',
                    content: 'Content of Tab 2'
                }
            ],
            panelContainerSettings: {
                size: '25%'
            }
        },
        {
            type: 'LayoutGroup',
            label: 'Item Group ',
            orientation: 'horizontal',
            items: [
                {
                    type: 'LayoutPanel',
                    label: 'Item 2',
                    items: [
                        {
                            label: 'Tab 3',
                            content: 'Content of Tab 3'
                        }],
                    panelContainerSettings: {
                        size: '50%'
                    }
                },
                {
                    type: 'LayoutPanel',
                    label: 'Item 3',
                    items: [
                        {
                            label: 'Tab 4',
                            content: 'Content of Tab 4'
                        }]
                }
            ]
        },
        {
            type: 'LayoutPanel',
            label: 'Item 4',
            items: [
                {
                    label: 'Tab 5',
                    content: 'Content of Tab 5'
                },
                {
                    label: 'Tab 6',
                    content: 'Content of Tab 6'
                }
            ],
            panelContainerSettings: {
                size: '25%'
            }
        }
    ];
};