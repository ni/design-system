function clickMe(event) {
    const button = document.querySelector("jqx-button");
    button.disabled = true;
    const attributeName = button.getAttribute("disabled");
    document.getElementById("log").innerHTML = "Disabled: " + attributeName;
}