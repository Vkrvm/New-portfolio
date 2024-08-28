document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        type: 'slide',
        perPage: 5,
        gap: '2rem',
        breakpoints: {
            1200: { perPage: 4 },
            992: { perPage: 3 },
            768: { perPage: 2 },
            576: { perPage: 1 },
        },
    }).mount();

    // Bind custom arrows
    document.getElementById('custom-prev').addEventListener('click', function () {
        splide.go('<');  // Go to the previous slide
    });

    document.getElementById('custom-next').addEventListener('click', function () {
        splide.go('>');  // Go to the next slide
    });
});