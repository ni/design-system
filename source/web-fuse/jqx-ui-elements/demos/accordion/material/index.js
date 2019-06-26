window.onload = function () {
    const accordionBehavior = document.getElementById('accordionBehavior');

    accordionBehavior.addEventListener('expanded', function (event) {
        const index = event.detail.index;

        if (index === 1) {
            accordionBehavior.update(1, { "label": "Self aware panel <span class='description'>Currently I am open</span>" });
        }
    });

    accordionBehavior.addEventListener('collapsed', function (event) {
        const index = event.detail.index;

        if (index === 1) {
            accordionBehavior.update(1, { "label": "Self aware panel <span class='description'>Currently I am closed</span>" });
        }
    });

}