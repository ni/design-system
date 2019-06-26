window.onload = function () {
    const pager1a = document.getElementById('pager1a'),
        pager1b = document.getElementById('pager1b'),
        pager1c = document.getElementById('pager1c'),
        pager1d = document.getElementById('pager1d'),
        pager1e = document.getElementById('pager1e'),
        pager2a = document.getElementById('pager2a'),
        pager2b = document.getElementById('pager2b'),
        pager3a = document.getElementById('pager3a'),
        pager3b = document.getElementById('pager3b'),
        mobile = document.getElementById('mobile'),
        imageContainer = document.getElementById('imageContainer'),
        content = document.getElementById('content');

    pager1b.localization = {
        'previousButton': '<i class="material-icons">&#xE408;</i>',
        'nextButton': '<i class="material-icons">&#xE409;</i>'
    };

    pager1d.localization = {
        'firstButton': '<i class="material-icons">&#xE5DC;</i>',
        'lastButton': '<i class="material-icons">&#xE5DD;</i>'
    };

    pager1e.localization = {
        'previousButton': '<i class="material-icons">&#xE408;</i>',
        'nextButton': '<i class="material-icons">&#xE409;</i>'
    };

    pager2a.localization = pager2b.localization = {
        'previousPageButton': '<i class="material-icons">&#xE408;</i>',
        'nextPageButton': '<i class="material-icons">&#xE409;</i>'
    };

    pager3a.localization = pager3b.localization = {
        'previousPageButton': '<i class="material-icons">&#xE408;</i>',
        'nextPageButton': '<i class="material-icons">&#xE409;</i>'
    };

    mobile.addEventListener('change', function () {
        content.className = 'img' + event.detail.index;
    });

    pager1c.itemsPerPage = pager1d.itemsPerPage = pager1e.itemsPerPage = getOptimalPageItems(pager1d, 35, 50);
    window.addEventListener("resize", function () {
        pager1c.itemsPerPage = pager1d.itemsPerPage = pager1e.itemsPerPage = getOptimalPageItems(pager1d, 35, 50);
    });

    function getOptimalPageItems(measuredElement, buttonWidth, freeSpace) {
        const pagerWidth = parseInt(window.getComputedStyle(measuredElement, null).getPropertyValue('width'));

        if (pagerWidth > 520) {
            return 10;
        }

        const itemsPerPage = Math.floor((pagerWidth - 2 * (buttonWidth + freeSpace)) / buttonWidth);

        return itemsPerPage < 3 ? 3 : itemsPerPage;
    }
}