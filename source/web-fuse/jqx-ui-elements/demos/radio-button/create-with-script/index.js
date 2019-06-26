window.onload = function () {
    const radioButton1 = document.createElement("jqx-radio-button");
    radioButton1.innerHTML = "Radio Button 1";
    radioButton1.checked = true;

    const radioButton2 = document.createElement("jqx-radio-button");
    radioButton2.innerHTML = "Radio Button 2";

    document.body.appendChild(radioButton1);
    document.body.appendChild(radioButton2);

    radioButton1.focus();
}