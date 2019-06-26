window.onload = function () {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const container = document.createElement("div"),
            toast = document.createElement("jqx-toast");

        container.classList.add("container");

        toast.value = 'Alert !';
        toast.type = 'warning';
        toast.blink = true;
        toast.autoOpen = true;
        toast.appendTo = container;

        fragment.appendChild(container);
        fragment.appendChild(toast);
    }
    document.body.appendChild(fragment);
}