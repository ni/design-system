let radioButtonsList = [];

// appends 100 radio buttons on the page
function appendRadioButtons() {
    const radioButtonsContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newRadioButton = document.createElement('jqx-radio-button');

        newRadioButton.groupName = 'group' + Math.round(i / 5);
        newRadioButton.classList.add('testRadioButton');
        radioButtonsList.push(newRadioButton);
        containerFragment.appendChild(newRadioButton);
    }

    radioButtonsContainer.appendChild(containerFragment);
    document.body.appendChild(radioButtonsContainer);
}

// executes value updates for all radio buttons in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            radioButtonsList[i].checked = Boolean(Math.round(Math.random() * 2));
        }
    }, 10);
}

window.onload = function () {
    appendRadioButtons();

    runTest();
};