import Swiper from 'swiper';

export default function() {
    const productsSliders = Array.from(document.querySelectorAll('.js-products-slider'));

    productsSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 60,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.producsts__slider-arrow--next'),
                prevEl: element.querySelector('.producsts__slider-arrow--prev')
            }
        });
    });
}
