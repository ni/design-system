window.onload = function () {
    const splitter = document.querySelector('jqx-splitter');

    document.getElementById('appendItem').addEventListener('click', function () {
        const item = document.createElement('jqx-splitter-item');

        item.innerHTML = 'New Item Content';
        splitter.appendChild(item);
    });

    document.getElementById('insertBefore').addEventListener('click', function () {
        const item = document.createElement('jqx-splitter-item');

        item.innerHTML = 'New Item Content';
        splitter.insertBefore(item, splitter._items[parseInt(document.getElementById('indexInput').value)]);
    });

    document.getElementById('removeItem').addEventListener('click', function () {
        splitter.removeChild(splitter._items[parseInt(document.getElementById('indexInput').value)]);
    });

    document.getElementById('insertButton').addEventListener('click', function () {
        splitter.insert(parseInt(document.getElementById('indexInput').value), { content: 'Newly Inserted Item' });
    });

    document.getElementById('removeButton').addEventListener('click', function () {
        splitter.remove(parseInt(document.getElementById('indexInput').value));
    });

    document.getElementById('updateButton').addEventListener('click', function () {
        splitter.update(parseInt(document.getElementById('indexInput').value), { content: 'Updated Content', size: 75 });
    });

    document.getElementById('showSplitterBar').addEventListener('click', function () {
        splitter.showBar(parseInt(document.getElementById('indexInput').value));
    });

    document.getElementById('hideSplitterBar').addEventListener('click', function () {
        splitter.hideBar(parseInt(document.getElementById('indexInput').value));
    });

    document.getElementById('collapseItem').addEventListener('click', function () {
        splitter.collapse(parseInt(document.getElementById('indexInput').value));
    });

    document.getElementById('expandItem').addEventListener('click', function () {
        splitter.expand(parseInt(document.getElementById('indexInput').value));
    });

    document.getElementById('lockSplitterItem').addEventListener('click', function () {
        splitter.lockItem(parseInt(document.getElementById('indexInput').value));
    });

    document.getElementById('unlockSplitterItem').addEventListener('click', function () {
        splitter.unlockItem(parseInt(document.getElementById('indexInput').value));
    });
}