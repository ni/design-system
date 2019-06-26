window.onload = function () {
    const tree = document.getElementById('tree');

    tree.expandAll(false);

    document.getElementById('resizeSlider').addEventListener('change', function (event) {
        const size = this.value + 'px';

        tree.style.width = size;
        tree.style.height = size;
    });
}