window.onload = function () {
    const list = document.getElementsByTagName("jqx-list-box")[0],
        // we determine the view size by dividing the height of the element by the height of its items and adding 10 more items so that a scrollbar is shown and the "virtual" scrolling is possible
        viewSize = Math.round(list.offsetHeight / list.itemHeight) + 10;
    let view = 0;

    loadItems(true);

    function loadItems(initialCall) {
        list.displayLoadingIndicator = true;

        // this timeout emulates a server call and data fetching
        setTimeout(function () {
            const itemsInNextView = [];

            if (view === 0) {
                for (let i = 0; i < viewSize; i++) {
                    itemsInNextView.push("Item " + (i + view * viewSize));
                }
            }
            else {
                for (let i = 0; i < viewSize; i++) {
                    itemsInNextView.push("Item " + (i + Math.round(viewSize / 2) * view));
                }
            }

            list.dataSource = itemsInNextView;

            if (!initialCall) {
                list.scrollTo(list.scrollHeight / 2);
            }

            list.displayLoadingIndicator = false;
        }, 1000);
    }

    list.addEventListener("scrollBottomReached", function () {
        view++;
        loadItems();
    });

    list.addEventListener("scrollTopReached", function () {
        if (view === 0) {
            return;
        }

        view--;
        loadItems();
    });
}
