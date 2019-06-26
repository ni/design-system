window.onload = function () {
    const button = document.createElement('jqx-repeat-button');
    button.innerHTML = "Click Me";
    button.id = "button";

    document.body.appendChild(button);

    const progressBar = document.getElementById('progress')

    button.onclick = function () {
        progressBar.value++;
    }
}