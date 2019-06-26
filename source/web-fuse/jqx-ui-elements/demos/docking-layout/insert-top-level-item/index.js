window.onload = function () {
            const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
                input = document.getElementById('indexInput'),
                tabsWindowObject =
                    {
                        label: 'New Item',
                        size: '50%',
                        items: [{
                            label: 'New Tab Item',
                            content: 'New Tab Item Content'
                        }]
                    };

            jqxDockingLayout.layout = [
                {
                    type: 'LayoutPanel',
                    label: 'Tabs 0',
                    items: [{
                        label: 'Tab 0',
                        content: 'Content of Tab 0'
                    }]
                },
                {
                    type: 'LayoutPanel',
                    label: 'Tabs 1',
                    items: [{
                        label: 'Tab 1',
                        content: 'Content of Tab 1',
                    }]
                }
            ];

            document.getElementById('insertLayoutLeft').addEventListener('click', function () {
                jqxDockingLayout.insertLayoutLeft(tabsWindowObject);
            });

            document.getElementById('insertLayoutRight').addEventListener('click', function () {
                jqxDockingLayout.insertLayoutRight(tabsWindowObject);
            });

            document.getElementById('insertLayoutTop').addEventListener('click', function () {
                jqxDockingLayout.insertLayoutTop(tabsWindowObject);
            });

            document.getElementById('insertLayoutBottom').addEventListener('click', function () {
                jqxDockingLayout.insertLayoutBottom(tabsWindowObject);
            });

            jqxDockingLayout.addEventListener('stateChange', function () {
                let layoutItems = this.items, index, tabItem, i
                undockedItems = this.undockedItems;

                for (i = 0; i < layoutItems.length; i++) {
                    layoutItems[i].label = 'Tabs ' + i;
                    layoutItems[i].update(0, 'Tab ' + i, 'Content of Tab ' + i);
                }

                for (i = 0; i < undockedItems.length; i++) {
                    undockedItems[i].label = 'Undocked Tabs';
                    undockedItems[i].update(0, 'Tab', 'Content of Undocked Tab');
                }
            });
        }