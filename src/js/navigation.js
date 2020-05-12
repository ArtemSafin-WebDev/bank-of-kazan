import Swiper from 'swiper';

export default function() {
    const navigationBlocks = Array.from(document.querySelectorAll('.js-navigation'));

    navigationBlocks.forEach(element => {
        const bgLayers = Array.from(element.querySelectorAll('.navigation__bg-layer'));
        const bgSliders = Array.from(element.querySelectorAll('.navigation__bg-slider .swiper-container'));
        const innerSliders = Array.from(element.querySelectorAll('.navigation__content-inner-slider'));
        const navigationMenuLayers = Array.from(element.querySelectorAll('.navigation__main-menu-layer'));
        const toggleCategoryLayer = element.querySelector('.navigation__universal-toggle-select-category');
        const searchFormLayer = element.querySelector('.navigation__universal-toggle-search-form');
        const categoryToggles = Array.from(element.querySelectorAll('.navigation__universal-toggle-select-category-link'));
        const searchToggleBtn = element.querySelector('.navigation__universal-toggle-search');
        const searchForm = element.querySelector('.navigation__universal-toggle-search-form');
        const innerSliderLayers = Array.from(element.querySelectorAll('.navigation__content-inner-slider-layer'));
        const backplate = element.querySelector('.navigation__backplate');
        const searchClose = element.querySelector('.navigation__universal-search-close');
        const searchInput = element.querySelector('.navigation__universal-toggle-search-form-input');
        const allNavigationTabs = Array.from(document.querySelectorAll('.navigation__content-right-col-menu-card'));
        const allNavLinks = Array.from(element.querySelectorAll('.navigation__main-menu-link'));
        const innerSlidersLayer = element.querySelector('.navigation__content-right-col-sliders');
        const innerMenusLayer = element.querySelector('.navigation__content-right-col-menus');
        const navMenuGroups = Array.from(element.querySelectorAll('.navigation__content-right-col-menus-group'));
        const menusCloseBtn = element.querySelector('.navigation__menus-close-btn');

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
                    allowTouchMove: false,
                    speed: 1000,
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        nextEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--next'),
                        prevEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--prev')
                    }
                });

                console.log({
                    nextEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--next'),
                    prevEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--prev')
                });

                const bgSlider = new Swiper(bgSliderContainer, {
                    slidesPerView: 1,
                    slidesPerView: 1,
                    effect: 'fade',
                    speed: 1800,
                    allowTouchMove: false,
                    fadeEffect: {
                        crossFade: false
                    }
                });

                bgSlider.controller.control = innerSlider;
                innerSlider.controller.control = bgSlider;
            });
        }

        function handleCategoryClick(btnIndex) {
            categoryToggles.forEach(btn => btn.classList.remove('active'));
            bgLayers.forEach(layer => layer.classList.remove('active'));
            navigationMenuLayers.forEach(layer => layer.classList.remove('active'));
            innerSliderLayers.forEach(layer => layer.classList.remove('active'));
            bgLayers[btnIndex].classList.add('active');
            categoryToggles[btnIndex].classList.add('active');
            navigationMenuLayers[btnIndex].classList.add('active');
            innerSliderLayers[btnIndex].classList.add('active');

            activeCategoryIndex = btnIndex;
        }

        function initializeNavigationMenu() {
            navigationMenuLayers.forEach(layer => {
                const navLinks = Array.from(layer.querySelectorAll('.navigation__main-menu-link'));

                navLinks.forEach((link, linkIndex) => {
                    link.addEventListener('click', event => {
                        event.preventDefault();
                     
                        allNavLinks.forEach(link => link.classList.remove('active'));
                        link.classList.add('active');
                        showNavigationMenuTab(linkIndex);
                    });
                });
            });
        }

        function showNavigationMenuTab(index) {
            backplate.classList.add('open');
            innerSlidersLayer.classList.remove('active');
            innerMenusLayer.classList.add('active');
            menusCloseBtn.classList.add('active');
            element.classList.add('nav-menu-open');
          
            allNavigationTabs.forEach(element => element.classList.remove('active'));
            const currentMenuGroup = navMenuGroups[activeCategoryIndex];
            const cardsInGroup = Array.from(currentMenuGroup.querySelectorAll('.navigation__content-right-col-menu-card'));

            cardsInGroup.forEach((card, cardIndex) => {
                if (cardIndex === index) {
                    card.classList.add('active');
                }
            })
        
        }

        function closeNavigationMenu() {
            backplate.classList.remove('open');
            innerSlidersLayer.classList.add('active');
            innerMenusLayer.classList.remove('active');
            menusCloseBtn.classList.remove('active');

           
            allNavLinks.forEach(link => link.classList.remove('active'));
            element.classList.remove('nav-menu-open');

            allNavigationTabs.forEach(element => element.classList.remove('active'));
        }

        function handleSearchBtn() {
            if (!searchOpen) {
                searchOpen = true;
                toggleCategoryLayer.classList.remove('active');
                searchFormLayer.classList.add('active');
                searchClose.classList.add('active');
            } else {
                searchForm.submit();
            }
        }

        function handleSearchCloseBtn() {
            searchOpen = false;
            toggleCategoryLayer.classList.add('active');
            searchFormLayer.classList.remove('active');
            searchClose.classList.remove('active');
            searchInput.value = '';
        }

        handleCategoryClick(activeCategoryIndex);
        initializeInnerSliders();
        initializeNavigationMenu();

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

        searchClose.addEventListener('click', function(event) {
            event.preventDefault();
            handleSearchCloseBtn();
        });

        menusCloseBtn.addEventListener('click', function(event) {
            event.preventDefault();
            closeNavigationMenu();
        });
    });
}
