window.onload = function () {
    const button = document.createElement("jqx-button");

    button.id = "button";
    button.innerHTML = "Click Me";
    document.body.appendChild(button);
    button.addEventListener("click", function () {
        button.innerHTML = "Clicked";
    });
}