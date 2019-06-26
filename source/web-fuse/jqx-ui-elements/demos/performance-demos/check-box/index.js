let checkBoxesList = [];

// appends 100 checkboxes on the page
function appendCheckBoxes() {
    const checkBoxesContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newCheckBox = document.createElement('jqx-check-box');

        newCheckBox.classList.add('testCheckBox');
        checkBoxesList.push(newCheckBox);
        containerFragment.appendChild(newCheckBox);
    }

    checkBoxesContainer.appendChild(containerFragment);
    document.body.appendChild(checkBoxesContainer);
}

// executes value updates for all checkboxes in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            checkBoxesList[i].checked = Boolean(Math.round(Math.random() * 2));
        }
    }, 10);
}

window.onload = function () {
    appendCheckBoxes();

    runTest();
};