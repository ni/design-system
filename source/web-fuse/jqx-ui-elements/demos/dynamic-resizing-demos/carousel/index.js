window.onload = function () {
    const slider = document.getElementById("horizontalSlider"),
        jqxCarousel = document.querySelector('jqx-carousel');

    jqxCarousel.dataSource = [
            {
                headline: 'Slide 1',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                headline: 'Slide 2',
                content: 'Suspendisse ornare nulla non risus bibendum, vitae tempus magna egestas.'
            },
            {
                headline: 'Slide 3',
                content: 'Donec ac ex hendrerit, condimentum metus a, vestibulum quam.'
            },
            {
                headline: 'Slide 4',
                content: 'Mauris rutrum est eget posuere sollicitudin.'
            },
            {
                headline: 'Slide 5',
                content: 'Duis vitae tortor at mi lobortis tristique.'
            },
            {
                headline: 'Slide 6',
                content: 'Quisque in lorem ut ligula rutrum convallis vel id neque.'
            }
    ];

    slider.addEventListener('change', function (event) {
        const size = event.detail.value;

        jqxCarousel.style.width = size + 'px';
        jqxCarousel.style.height = size / 2 + 'px';
    });
};