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

    document.getElementById('insertIntoLeft').addEventListener('click', function () {
        jqxDockingLayout.insertIntoLeft(dropDownList.selectedIndexes[0], tabsWindowObject);
        createListItem();
    });

    document.getElementById('insertIntoRight').addEventListener('click', function () {
        jqxDockingLayout.insertIntoRight(dropDownList.selectedIndexes[0], tabsWindowObject);
        createListItem();
    });

    document.getElementById('insertIntoTop').addEventListener('click', function () {
        jqxDockingLayout.insertIntoTop(dropDownList.selectedIndexes[0], tabsWindowObject);
        createListItem();
    });

    document.getElementById('insertIntoBottom').addEventListener('click', function () {
        jqxDockingLayout.insertIntoBottom(dropDownList.selectedIndexes[0], tabsWindowObject);
        createListItem();
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