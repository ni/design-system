window.onload = function () {
    document.querySelector('jqx-list-box').filterCallback = function (item, searchQuery) {
        return item.value.toLowerCase() === searchQuery.toLowerCase();
    }
}