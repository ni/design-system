window.onload = function () {
    const myCustomElement = document.querySelector('jqx-numeric-text-box');
    let messagesEnglish = myCustomElement.messages.en;

    messagesEnglish.binary = 'binary';
    messagesEnglish.octal = 'octal';
    messagesEnglish.decimal = 'decimal';
    messagesEnglish.hexadecimal = 'hexadecimal';
};