window.onload = function () {
    const layout = document.getElementById('layout');
    const tree = `<jqx-tree id="tree" filterable>
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
             <jqx-multiline-text-box id="editor1">
                      <jqx-tree id="tree" filterable>
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
                    </jqx-tree>
                </jqx-multiline-text-box>
`;

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
            id: 'item1',
            label: 'Tabs 1',
            items: [{
                label: 'Tab 1',
                selected: true,
                content: multiLine
            },
            {
                label: 'Tab 2',
                content: '<jqx-multiline-text-box id="editor2">File Editor 2</jqx-multiline-text-box>'
            },
            {
                label: 'Tab 3',
                content: '<jqx-multiline-text-box id="editor3">File Editor 3</jqx-multiline-text-box>'
            }],
            headerPosition: 'none',
            tabCloseButtons: true

        },
        {
            id: 'item2',
            label: 'Solution Explorer',
            items: [{
                label: 'Tab 4',
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
                content: '<jqx-gauge></jqx-gauge>'
            },
            {
                label: 'Tab 5',
                content: 'Contents of Tab Item 5.'
            }],
            autoHide: true,
            autoHidePosition: 'top'
        }];
}