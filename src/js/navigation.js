import Swiper from 'swiper';

export default function() {
    const navigationBlocks = Array.from(document.querySelectorAll('.js-navigation'));

    navigationBlocks.forEach(element => {
        const bgLayers = Array.from(element.querySelectorAll('.navigation__bg-layer'));
        const bgSliders = Array.from(element.querySelectorAll('.navigation__bg-slider .swiper-container'));
        const innerSliders = Array.from(element.querySelectorAll('.navigation__content-inner-slider'));
        const navigationMenuLayers = Array.from(element.querySelectorAll('.navigation__main-menu-layer'));
        const categoryToggles = Array.from(element.querySelectorAll('.navigation__universal-toggle-select-category-link'));
        const searchToggleBtn = element.querySelector('.navigation__universal-toggle-search');
        const searchForm = element.querySelector('.navigation__universal-toggle-search-form');
        let forCompanies = false;
        let searchOpen = false;
        let activeCategoryIndex = 0;

        function initializeInnerSliders() {
            innerSliders.forEach((sliderWrapper, sliderIndex) => {
                const container = sliderWrapper.querySelector('.swiper-container');
                const bgSliderContainer = bgSliders[sliderIndex];

                const innerSlider = new Swiper(container, {
                    slidesPerView: 1,
                    watchOverflow: true,
                    autoHeight: false,
                    effect: 'fade',
                    speed: 1000,
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        nextEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--next'),
                        prevEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--prev')
                    }
                });

                console.log(
                    {
                        nextEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--next'),
                        prevEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--prev')
                    }
                )

                const bgSlider = new Swiper(bgSliderContainer, {
                    slidesPerView: 1,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    }
                });

                bgSlider.params.control = innerSlider;

                // innerSlider.params.control = bgSlider;
               
            });
        }

        function handleCategoryClick(btnIndex) {
            categoryToggles.forEach(btn => btn.classList.remove('active'));
            bgLayers.forEach(layer => layer.classList.remove('active'));
            navigationMenuLayers.forEach(layer => layer.classList.remove('active'));
            bgLayers[btnIndex].classList.add('active');
            categoryToggles[btnIndex].classList.add('active');
            navigationMenuLayers[btnIndex].classList.add('active');

            activeCategoryIndex = btnIndex;
        }


        

        function handleSearchBtn() {
            if (!searchOpen) {
                searchOpen = true;
            } else {
                searchForm.submit();
            }
        }

        handleCategoryClick(activeCategoryIndex);
        initializeInnerSliders();

        categoryToggles.forEach((btn, btnIndex) =>
            btn.addEventListener('click', event => {
                event.preventDefault();
                handleCategoryClick(btnIndex);
            })
        );

        searchToggleBtn.addEventListener('click', function(event) {
            event.preventDefault();
            handleSearchBtn();
        });
    });
}
