import Swiper from 'swiper';

let instances = [];

function init() {
    const productsSliders = Array.from(document.querySelectorAll('.js-products-slider'));

    productsSliders.forEach(element => {
        const prev = element.querySelector('.products__slider-arrow--prev');
        const next = element.querySelector('.products__slider-arrow--next');
        const tabBtns = Array.from(element.querySelectorAll('.js-tabs-nav'));
        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));
        const hasTabs = tabBtns.length > 0 && tabItems.length > 0;
        const localInstances = [];
        const options = {
            slidesPerView: 'auto',
            spaceBetween: 20,
            watchOverflow: true,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 40
                },
                1025: {
                    slidesPerView: 'auto',
                    spaceBetween: 60
                }
            },
            on: {
                progress: function() {
                    if (this.isEnd) {
                        element.classList.add('last-slide-reached');
                    } else {
                        element.classList.remove('last-slide-reached');
                    }
                    console.log('is end', this.isEnd)
                }
            }
        };

        if (hasTabs) {
            tabItems.forEach(item => {
                const container = item.querySelector('.swiper-container');

                const slider = new Swiper(container, options);

                instances.push({
                    slider
                });
                localInstances.push({
                    slider,
                    tabItem: item
                });
            });
        } else {
            const container = element.querySelector('.swiper-container');
            const slider = new Swiper(container, options);
            instances.push({
                slider
            });
            localInstances.push({
                slider
            });
        }

        function handleArrowClick(direction = 'next') {
            let activeInstance = null;
            if (hasTabs) {
                activeInstance = localInstances.find(instance => instance.tabItem.matches('.active'));
                if (!activeInstance) throw new Error('No active tab index');
            } else {
                activeInstance = localInstances[0];
            }
            if (direction === 'next') {
                activeInstance.slider.slideNext();
            } else {
                activeInstance.slider.slidePrev();
            }
        }

        function handleButtonsActivity() {
            let activeInstance = null;
            if (hasTabs) {
                activeInstance = localInstances.find(instance => instance.tabItem.matches('.active'));
                if (!activeInstance) throw new Error('No active tab index');
            } else {
                activeInstance = localInstances[0];
            }
            prev.classList.remove('button-disabled');
            next.classList.remove('button-disabled');
            if (activeInstance.slider.progress == 0) {
                prev.classList.add('button-disabled');
            }
            if (activeInstance.slider.progress == 1) {
                next.classList.add('button-disabled');
            }
        }

        prev.addEventListener('click', event => {
            event.preventDefault();
            if (prev.classList.contains('button-disabled')) return;
            handleArrowClick('prev');
            handleButtonsActivity();
        });

        next.addEventListener('click', event => {
            event.preventDefault();
            if (next.classList.contains('button-disabled')) return;
            handleArrowClick('next');
            handleButtonsActivity();
        });

        tabBtns.forEach(btn => btn.addEventListener('click', handleButtonsActivity));

        handleButtonsActivity();
    });
}

function destroy() {
    instances.forEach(instance => instance.destroy());
    instances = [];
}

export default {
    init,
    destroy
};
