let splitterList = [];

// appends 100 sliders on the page
function appendSplitters() {
    const splittersContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newSplitter = document.createElement('jqx-splitter');
        newSplitter.dataSource = [{ content: 'Item 1', collapsible: true }, { content: 'Item 2', collapsible: true }]

        splitterList.push(newSplitter);

        containerFragment.appendChild(newSplitter);
    }

    splittersContainer.appendChild(containerFragment);
    document.body.appendChild(splittersContainer);
}

// executes value updates for all sliders in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            splitterList[i].items.map(item => item.size = (Math.random() * 59 + 1).toString());
            //splitterList[i].items[0].collapsed = !splitterList[i].items[0].collapsed;
        }
    }, 10);
}

window.onload = function () {
    appendSplitters();

    runTest();
};