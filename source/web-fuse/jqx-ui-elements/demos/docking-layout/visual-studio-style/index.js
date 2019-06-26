window.onload = function () {
    const layout = document.querySelector('jqx-docking-layout'),
	tree = `<jqx-tree id="tree" filterable>
                                <jqx-tree-items-group>
                                    <i class="material-icons">folder</i> Attractions
                                    <jqx-tree-item>Movies</jqx-tree-item>
                                    <jqx-tree-item>Circus</jqx-tree-item>
                                    <jqx-tree-item>Concerts</jqx-tree-item>
                                    <jqx-tree-item>Monuments</jqx-tree-item>
                                </jqx-tree-items-group>
                                <jqx-tree-items-group>
                                    <i class="material-icons">folder</i> Dining
                                    <jqx-tree-item>Restaurants</jqx-tree-item>
                                    <jqx-tree-item>Caf&eacute;s</jqx-tree-item>
                                    <jqx-tree-item>Bars</jqx-tree-item>
                                </jqx-tree-items-group>
                                <jqx-tree-items-group>
                                    <i class="material-icons">folder</i> Education
                                    <jqx-tree-item>Schools</jqx-tree-item>
                                    <jqx-tree-item>Colleges</jqx-tree-item>
                                    <jqx-tree-item>Universities</jqx-tree-item>
                                    <jqx-tree-item>Educational courses</jqx-tree-item>
                                </jqx-tree-items-group>
                                <jqx-tree-items-group>
                                    <i class="material-icons">folder</i> Family
                                    <jqx-tree-item>Babysitting</jqx-tree-item>
                                    <jqx-tree-item>Family trips</jqx-tree-item>
                                    <jqx-tree-item>Theme parks</jqx-tree-item>
                                </jqx-tree-items-group>
                                <jqx-tree-items-group>
                                    <i class="material-icons">folder</i> Health
                                    <jqx-tree-item>Hospitals</jqx-tree-item>
                                    <jqx-tree-item>Family physicians</jqx-tree-item>
                                    <jqx-tree-item>Optics</jqx-tree-item>
                                </jqx-tree-items-group>
                            </jqx-tree>`,
        multiLine = `
<jqx-multiline-text-box>
 window.onload = function() {
        const button = document.querySelector('jqx-button');

        buttons.addEventListener('click', function() {
            alert('Hello World!');
        });
    }
    </jqx-multiline-text-box>
 `;

    const multiLineContent2 = `
jqx-button {
    width: 125px;
    height: 35px;
}
         `;

    const multiLineContent3 = `<jqx-button>Click Me</jqx-button> `;

    layout.layout = [
        {
            id: 'item0',
            label: 'Tabs 0',
            items: [{
                label: 'Tab A',
                selected: true,
                content: 'This is the first item of the Tabs 0.'
            },
            {
                label: 'Tab B',
                content: '<jqx-text-box>Some Text Inside the Text Box</jqx-text-box>'
            }],
            autoHide: true,
            autoHidePosition: 'left'
        },
        {
            type: 'LayoutGroup',
            items: [
                {
                    type: 'LayoutPanel',
                    id: 'tabPanel',
                    label: 'Tabs 1',
                    items: [{
                        label: 'helloWorld.js',
                        selected: true,
                        content: multiLine
                    },
                    {
                        label: 'helloWorld.css',
                        content: '<jqx-multiline-text-box id="editor2">' + multiLineContent2 + '</jqx-multiline-text-box>'
                    },
                    {
                        label: 'helloWorld.html',
                        content: '<jqx-multiline-text-box id="editor3">' + multiLineContent3 + '</jqx-multiline-text-box>'
                    }],
                    headerPosition: 'none',
                    tabCloseButtons: true,
                    panelContainerSettings: {
                        size: '75%'
                    }
                },
                {
                    type: 'LayoutPanel',
                    label: 'Output',
                    items: [
                        {
                            label: 'Output',
                            headerPosition: 'none',
                            content: 'All files are up to date.'
                        }
                    ],
                    headerPosition: 'none'
                }
            ],
            orientation: 'horizontal'
        },
        {
            id: 'item2',
            label: 'Solution Explorer',
            items: [{
                label: 'Solution Explorer',
                content: tree
            }],
            tabPosition: 'hidden'
        },
        {
            id: 'item3',
            label: 'Tabs 3',
            items: [{
                label: 'Tab 4',
                selected: true,
                content: 'Content of Tab 4'
            },
            {
                label: 'Tab 5',
                content: 'Contents of Tab Item 5.'
            }],
            autoHide: true,
            autoHidePosition: 'top'
        }];
}