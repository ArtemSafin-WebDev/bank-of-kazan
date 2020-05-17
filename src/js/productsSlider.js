import Swiper from 'swiper';


let instances = [];

function init() {
    const productsSliders = Array.from(document.querySelectorAll('.js-products-slider'));
    
    productsSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        const instance = new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.producsts__slider-arrow--next'),
                prevEl: element.querySelector('.producsts__slider-arrow--prev')
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 40
                },
                1025: {
                    slidesPerView: 'auto',
                    spaceBetween: 60
                }
            }
        });

        instances.push(instance);
    });
}

function destroy() {
    console.log('Cleaning products instances', instances);
    instances.forEach(instance => instance.destroy());
    instances = [];
}

export default {
    init,
    destroy
}
