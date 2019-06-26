window.onload = function () {
    const scrollBar = document.createElement("jqx-scroll-bar");

    scrollBar.id = "scrollBar";
    document.body.appendChild(scrollBar);
    scrollBar.addEventListener("change", function (event) {
        document.getElementById('scrollBarLog').innerHTML = event.detail.value;
    });
}