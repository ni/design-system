window.onload = function () {
    const list = document.getElementsByTagName("jqx-list-box")[0];
    list.addEventListener("scrollBottomReached", function () {
        list.displayLoadingIndicator = true;

        setTimeout(function () {
            const index = list.items.length;
            let items = [];
            for (let i = 0; i < 10; i++) {
                items.push("Item " + parseInt(i + index));
            }

            list.insert(index, items);
            list.displayLoadingIndicator = false;
        }, 1000);
    });
}