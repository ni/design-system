let carouselsList = [];

// appends 100 carousels on the page
function appendCarousels() {
    const carouselsContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newCarousel = document.createElement('jqx-carousel');

        newCarousel.autoPlay = true;
        newCarousel.slideShow = true;
        newCarousel.arrows = true;
        newCarousel.indicators = true;
        newCarousel.loop = true;
        newCarousel.interval = 10;
        newCarousel.dataSource = [{ headline: 'Slide 1' }, { headline: 'Slide 2' }, { headline: 'Slide 3' }];

        carouselsList.push(newCarousel);
        containerFragment.appendChild(newCarousel);
    }

    carouselsContainer.appendChild(containerFragment);
    document.body.appendChild(carouselsContainer);
}

window.onload = function () {
    appendCarousels();

    for (let i = 0; i < 100; i++) {
        carouselsList[i].play();
    }
};