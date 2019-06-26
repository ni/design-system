window.onload = function () {
    const myElement = document.querySelector('jqx-button');
    myElement.onclick = function () {
        myElement.innerHTML = "Clicked";
    }
}