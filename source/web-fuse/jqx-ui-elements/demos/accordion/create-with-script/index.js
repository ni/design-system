window.onload = function () {
    const accordion = document.createElement('jqx-accordion');

    for (let j = 0; j < 4; j++) {
        const accordionItem = document.createElement('jqx-accordion-item');

        accordionItem.label = 'Item ' + j;
        accordionItem.content = 'Content ' + j;
        accordion.appendChild(accordionItem);
    }

    document.body.appendChild(accordion);
}