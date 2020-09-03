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
        const btnSliderContainers = Array.from(element.querySelectorAll('.navigation__content-btn-slider .swiper-container'));
        // const aboutBankBtn = document.querySelector('.page-header__about-bank-link');

        let searchOpen = false;
        let activeCategoryIndex = 0;
        let navigationMenuOpen = false;
       

        function initializeInnerSliders() {
            innerSliders.forEach((sliderWrapper, sliderIndex) => {
                const container = sliderWrapper.querySelector('.swiper-container');
                const bgSliderContainer = bgSliders[sliderIndex];
                const btnSliderContainer = btnSliderContainers[sliderIndex];

                const innerSlider = new Swiper(container, {
                    slidesPerView: 1,
                    watchOverflow: true,
                    autoHeight: false,
                    effect: 'fade',
                    allowTouchMove: window.matchMedia('(max-width: 767px)').matches ? true : false,
                    speed: 500,
                    followFinger: false,
                    loop: true,
                    loopedSlides: 3,
                    fadeEffect: {
                        crossFade: true
                    },
                    navigation: {
                        nextEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--next'),
                        prevEl: sliderWrapper.querySelector('.navigation__content-inner-slider-arrow--prev')
                    },
                    pagination: {
                        el: sliderWrapper.querySelector('.navigation__content-inner-slider-pagination'),
                        type: 'bullets'
                    }
                });

                const bgSlider = new Swiper(bgSliderContainer, {
                    slidesPerView: 1,
                    speed: 1800,
                    allowTouchMove: false,
                    effect: 'fade',
                    loop: true,
                    loopedSlides: 3,
                    fadeEffect: {
                        crossFade: false
                    }
                });

                const btnSlider = new Swiper(btnSliderContainer, {
                    slidesPerView: 1,
                    effect: 'fade',
                    speed: 300,
                    allowTouchMove: false,
                    loop: true,
                    loopedSlides: 3,
                    fadeEffect: {
                        crossFade: true
                    }
                });

                bgSlider.controller.control = btnSlider;
                innerSlider.controller.control = bgSlider;
                // btnSlider.controller.control = innerSlider;
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

            if (navigationMenuOpen) {
                const navigationLinks = Array.from(navigationMenuLayers[btnIndex].querySelectorAll('.navigation__main-menu-link'))

                if (navigationLinks.length) {
                    navigationLinks[0].click();
                }
            }
        }

        function initializeNavigationMenu() {
            navigationMenuLayers.forEach(layer => {
                const navLinks = Array.from(layer.querySelectorAll('.navigation__main-menu-link'));

                navLinks.forEach((link, linkIndex) => {
                    link.addEventListener('click', event => {
                        event.preventDefault();
                        const linkIsActive = link.classList.contains('active');

                        allNavLinks.forEach(link => link.classList.remove('active'));

                        if (!linkIsActive) {
                            link.classList.add('active');
                            showNavigationMenuTab(linkIndex);
                        } else {
                            closeNavigationMenu();
                        }
                    });
                });
            });
        }

        function showNavigationMenuTab(index) {
            backplate.classList.add('open');
            document.body.classList.add('violet-backplate');
            innerSlidersLayer.classList.remove('active');
            innerMenusLayer.classList.add('active');
            menusCloseBtn.classList.add('active');
            element.classList.add('nav-menu-open');
            navigationMenuOpen = true;
            allNavigationTabs.forEach(element => element.classList.remove('active'));
            const currentMenuGroup = navMenuGroups[activeCategoryIndex];
            const cardsInGroup = Array.from(currentMenuGroup.querySelectorAll('.navigation__content-right-col-menu-card'));

            cardsInGroup.forEach((card, cardIndex) => {
                if (cardIndex === index) {
                    card.classList.add('active');
                }
            });
        }

        function closeNavigationMenu() {
            backplate.classList.remove('open');
            document.body.classList.remove('violet-backplate');

            innerSlidersLayer.classList.add('active');
            innerMenusLayer.classList.remove('active');
            menusCloseBtn.classList.remove('active');
            navigationMenuOpen = false;
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

        function detectCurrentActiveCategory() {
            const categoryIndex = categoryToggles.findIndex(link => {
                const href = link.href;
                const path = window.location.pathname;
                const matched = href.includes(path);

                return matched;
            });

            if (categoryIndex !== -1) {
                handleCategoryClick(categoryIndex);
            }
        }

        // function showAboutBankMenu() {
        //     element.classList.add('bank-menu-shown');
        //     backplate.classList.add('open');
        //     document.body.classList.add('violet-backplate');
        //     aboutBankMenuOpen = true;
        // }

        // function hideAboutBankMenu() {
        //     element.classList.remove('bank-menu-shown');
        //     aboutBankMenuOpen = false;
        //     if (!navigationMenuOpen) {
        //         backplate.classList.remove('open');
        //         document.body.classList.remove('violet-backplate');
        //     }
        // }

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

        // if (aboutBankBtn) {
        //     aboutBankBtn.addEventListener('click', event => {
        //         event.preventDefault();
        //         const open = aboutBankBtn.classList.contains('active');
        //         if (!open) {
        //             showAboutBankMenu();
        //         } else {
        //             hideAboutBankMenu();
        //         }
        //         aboutBankBtn.classList.toggle('active');
        //     });
        // }

        detectCurrentActiveCategory();
    });
}
