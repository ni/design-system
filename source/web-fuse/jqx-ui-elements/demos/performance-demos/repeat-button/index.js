window.onload = function () {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const button = document.createElement("jqx-repeat-button");
        button.classList.add('testRepeatButton');
        button.innerHTML = "Click Me";
        fragment.appendChild(button);
    }
    document.body.appendChild(fragment);
}