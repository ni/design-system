let newPasswordTextBoxesList = [];

// appends 100 PasswordTextBoxes  on the page
function appendPasswordTextBoxes() {
    const passwordTextBoxesContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newPasswordTextBox = document.createElement('jqx-password-text-box');

        newPasswordTextBox.classList.add('testPasswordTextBox');
        newPasswordTextBox.placeholder = 'Your password';
        newPasswordTextBox.showPasswordIcon = true;
        newPasswordTextBox.showPasswordStrength = true;
        newPasswordTextBox.tooltipArrow = true;
        newPasswordTextBoxesList.push(newPasswordTextBox);
        containerFragment.appendChild(newPasswordTextBox);
    }

    passwordTextBoxesContainer.appendChild(containerFragment);
    document.body.appendChild(passwordTextBoxesContainer);
}

// executes value updates for all PasswordTextBoxes in a 10ms loop
function runTest() {
    const text = ['Loremipsumdo', 'Integerasollicitudin', ''];
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            newPasswordTextBoxesList[i].value = text[Math.round(Math.random() * 2)];
        }
    }, 10);
}

window.onload = function () {
    appendPasswordTextBoxes();

    runTest();
};