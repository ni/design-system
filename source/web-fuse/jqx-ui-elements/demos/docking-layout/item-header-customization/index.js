window.onload = function () {
    const docking = document.querySelector('jqx-docking-layout');

    docking.layout = [
        {
            //The Base Group
            type: 'LayoutGroup',
            orientation: 'horizontal',
            items: [
                {
                    //DockingLayout Sub-Group
                    type: 'LayoutGroup',
                    orientation: 'vertical',
                    size: '50%',
                    items: [
                        {
                            //DockingLayout Item A
                            label: 'TabsWindow A',
                            size: '45%',
                            tabPosition: 'hidden',
                            items: [{
                                //Tab Item A1 of Item A
                                label: 'Tab A1',
                                content: 'Item Settings: <ul><li><b>tabPosition</b> set to "none"</li></ul>'
                            }]
                        },
                        {
                            //DockingLayout Item C
                            label: 'TabsWindow C',
                            tabPosition: 'hidden',
                            headerPosition: 'none',
                            size: '25%',
                            items: [{
                                //Tab Item C1 of Item C
                                label: 'Tab C1',
                                content: 'Item Settings: <ul><li><b>tabPosition</b> set to "none"</li>  <li><b>headerPosition</b> set to "none" </li></ul>'
                            }]
                        }
                    ]
                },
                {
                    //DockingLayout Item B
                    label: 'TabsWindow B',
                    tabPosition: 'bottom',
                    items: [{
                        //Tab Item B1 of Item B
                        label: 'Tab B1',
                        content: 'Item Settings: <ul><li><b>tabPosition</b> set to "bottom"</li></ul>'
                    },
                    {
                        //Tab Item B2 of Item B
                        label: 'Tab B2',
                        selected: true,
                        content: 'Item Settings: <ul><li><b>tabPosition</b> set to "bottom"</li></ul>'
                    }]
                }
            ]
        }];
}