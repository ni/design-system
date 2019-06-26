let tabsList = [];

// appends 100 tabs on the page
function appendTabs() {
    const tabsContainer = document.createElement('div');

    const containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newTabs = document.createElement('jqx-tabs');

        newTabs.classList.add('performanceDemoTabs');
        newTabs.innerHTML = '<jqx-tab-item label="TAB 1">Content 1</jqx-tab-item><jqx-tab-item label="TAB 2" selected>Content 2</jqx-tab-item><jqx-tab-item label="TAB 3">Content 3</jqx-tab-item><jqx-tab-item label="TAB 4">Content 4</jqx-tab-item>';

        tabsList.push(newTabs);
        containerFragment.appendChild(newTabs);
    }

    tabsContainer.appendChild(containerFragment);
    document.body.appendChild(tabsContainer);
}

// executes value updates for all tabs in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            tabsList[i].select(Math.floor(Math.random() * 4));
        }
    }, 10);
}

window.onload = function () {
    appendTabs();

    runTest();
};