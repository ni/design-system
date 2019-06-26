window.onload = function () {
    const tabs = document.createElement('jqx-tabs');

    document.body.appendChild(tabs);

    const tabItem1 = document.createElement('jqx-tab-item'),
        tabItem2 = document.createElement('jqx-tab-item');

    tabItem1.label = 'TAB 1';
    tabItem1.content = 'Content 1';
    tabItem2.label = 'TAB 2';
    tabItem2.content = 'Content 2';

    tabs.appendChild(tabItem1);
    tabs.appendChild(tabItem2);
}