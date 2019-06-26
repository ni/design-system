 window.onload = function () {
            const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
                input = document.getElementById('indexInput'),
                dropDownList = document.querySelector('jqx-drop-down-list'),
                tabsWindowObject =
                    {
                        label: 'New Item',
                        size: '50%',
                        items: [{
                            label: 'New Tab Item',
                            content: 'New Tab Item Content'
                        }]
                    },
                 createListItem = function () {
                    const item = document.createElement('jqx-list-item');

                    item.label = 'Tabs ' + dropDownList.items.length;
                    dropDownList.appendChild(item);
                };

            jqxDockingLayout.layout = [
                {
                    type: 'LayoutGroup',
                    orientation: 'horizontal',
                    items: [
                        {
                            type: 'LayoutPanel',
                            label: 'Tabs 0',
                            size: '65%',
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
                            type: 'LayoutPanel',
                            label: 'Tabs 2',
                            size: '25%',
                            items: [{
                                label: 'Tab 2',
                                content: 'Content of Tab 2'
                            }]
                        },
                        {
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

            document.getElementById('insertOutsideTargetGroupLeft').addEventListener('click', function () {
                jqxDockingLayout.insertOutsideTargetGroupLeft(dropDownList.selectedIndexes[0], tabsWindowObject);
                createListItem();
            });

            document.getElementById('insertOutsideTargetGroupRight').addEventListener('click', function () {
                jqxDockingLayout.insertOutsideTargetGroupRight(dropDownList.selectedIndexes[0], tabsWindowObject);
                createListItem();
            });

            document.getElementById('insertOutsideTargetGroupTop').addEventListener('click', function () {
                jqxDockingLayout.insertOutsideTargetGroupTop(dropDownList.selectedIndexes[0], tabsWindowObject);
                createListItem();
            });

            document.getElementById('insertOutsideTargetGroupBottom').addEventListener('click', function () {
                jqxDockingLayout.insertOutsideTargetGroupBottom(dropDownList.selectedIndexes[0], tabsWindowObject);
                createListItem();
            });

            jqxDockingLayout.addEventListener('stateChange', function () {
                let layoutItems = this.items, index, tabItem, i
                    undockedItems = this.undockedItems;

                for (i = 0; i < undockedItems.length; i++) {
                    undockedItems[i].label = 'Undocked Tabs';
                    undockedItems[i].update(0, 'Tab', 'Content of Undocked Tab');
                }
            });
        }