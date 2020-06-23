export default function() {
    const productNavElements = Array.from(document.querySelectorAll('.js-product-nav'));

    productNavElements.forEach(element => {
        const categoryLinks = Array.from(element.querySelectorAll('.js-product-nav-category-link'));

        const categoryLayers = Array.from(element.querySelectorAll('.js-product-nav-layer'));
        const menuLinks = Array.from(element.querySelectorAll('.js-product-nav-menu-link'));
        const menuItems = Array.from(element.querySelectorAll('.js-product-nav-menu-item'));
        const searchForm = element.querySelector('.js-product-navigation-search-form');
        const searchBtn = element.querySelector('.js-product-nav-search-btn');
        const closeBtn = element.querySelector('.js-product-nav-close-btn');
        const closeMenuBtns = Array.from(element.querySelectorAll('.js-product-nav-close'));
        // const aboutBankLink = document.querySelector('.page-header__about-bank-link');
        // const bankMenuLayer = element.querySelector('.js-bank-menu-layer');
        const productInfoItem = element.querySelector('.js-product-info-item');
        // let searchFormOpen = false;
        // let bankMenuOpen = false;
        let categoryIndex = categoryLayers.findIndex(element => element.classList.contains('active'));

        if (categoryIndex === -1) {
            categoryIndex = 0;
            console.error('No active category index detected');
        }
        let initialActiveCategory = categoryIndex;

        let standardInitialActiveLink = menuLinks.find(link => {
            return link.classList.contains('active') && !categoryLayers[initialActiveCategory].contains(link);
        });

        // let mainMenuActiveLink = menuLinks.findIndex(link => {
        //     return link.classList.contains('active') && categoryLayers[initialActiveCategory].contains(link);
        // });

        console.log('Menu items', menuItems);
        console.log('Menu btns', menuLinks);

        // function openBankMenu() {
        //     categoryLinks.forEach(link => link.classList.remove('active'));
        //     categoryLayers.forEach(layer => layer.classList.remove('active'));
        //     bankMenuLayer.classList.add('active');
        //     closeInnerMenu();
        //     element.classList.add('bank-menu-open');
        //     aboutBankLink.classList.add('active');
        //     element.classList.remove('search-form-open');
        //     searchFormOpen = false;
        //     bankMenuOpen = true;
        // }

        function autoScrollToActiveMenuItem() {
            const scrollContainers = Array.from(document.querySelectorAll('.product-navigation__card-menu'));

            scrollContainers.forEach(container => {
                const items = Array.from(container.children);
                const activeItem = items.find(element => element.classList.contains('active'));

                if (!activeItem) {
                    return false;
                } else {
                    container.scrollTo({
                        top: 0,
                        left: activeItem.offsetLeft - parseFloat(getComputedStyle(container).paddingLeft),
                        behavior: 'smooth'
                    });

                    console.log('Scrolled');
                }
            });
        }

        // function closeBankMenu() {
        //     selectCategory(categoryIndex);
        //     bankMenuLayer.classList.remove('active');
        //     closeInnerMenu();
        //     element.classList.remove('bank-menu-open');
        //     aboutBankLink.classList.remove('active');
        //     bankMenuOpen = false;
        // }

        function closeInnerMenu() {
            menuLinks.forEach(link => link.classList.remove('active'));
            menuItems.forEach(item => item.classList.remove('active'));
            document.body.classList.remove('product-nav-menu-open');
            productInfoItem.classList.add('active');
        }

        function selectCategory(index) {
            categoryLinks.forEach(link => link.classList.remove('active'));
            categoryLinks[index].classList.add('active');
            categoryLayers.forEach(layer => layer.classList.remove('active'));
            categoryLayers[index].classList.add('active');
            categoryIndex = index;
            closeInnerMenu();

            if (standardInitialActiveLink && initialActiveCategory !== categoryIndex) {
                const layer = categoryLayers[categoryIndex];

                const menuLinks = Array.from(layer.querySelectorAll('.js-product-nav-menu-link'));
                const menuItems = Array.from(layer.querySelectorAll('.js-product-nav-menu-item'));

                function handleMenuClick(index) {
                    menuLinks.forEach(link => link.classList.remove('active'));
                    menuLinks[index].classList.add('active');
                    menuItems.forEach(item => item.classList.remove('active'));
                    menuItems[index].classList.add('active');
                    productInfoItem.classList.remove('active');
                    document.body.classList.add('product-nav-menu-open');
                }

                handleMenuClick(menuLinks.indexOf(standardInitialActiveLink));
            }
        }

        searchBtn.addEventListener('click', event => {
            event.preventDefault();
            if (!element.classList.contains('search-form-open')) {
                element.classList.add('search-form-open');
                // searchFormOpen = true;
            } else {
                searchForm.submit();
            }
        });

        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            if (element.classList.contains('search-form-open')) {
                element.classList.remove('search-form-open');
                // searchFormOpen = false;
                searchForm.reset();
            }
        });


        if (element.classList.contains('js-product-nav-short')) return;

        categoryLinks.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                console.log('Selected category', linkIndex + 1);
                selectCategory(linkIndex);
            });
        });

        categoryLayers.forEach(layer => {
            const menuLinks = Array.from(layer.querySelectorAll('.js-product-nav-menu-link'));
            const menuItems = Array.from(layer.querySelectorAll('.js-product-nav-menu-item'));

            function handleMenuClick(index) {
                menuLinks.forEach(link => link.classList.remove('active'));
                menuLinks[index].classList.add('active');
                menuItems.forEach(item => item.classList.remove('active'));
                menuItems[index].classList.add('active');
                productInfoItem.classList.remove('active');
                document.body.classList.add('product-nav-menu-open');
            }

            menuLinks.forEach((link, linkIndex) => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    if (!link.classList.contains('active')) {
                        handleMenuClick(linkIndex);
                     
                    } else if (!categoryLayers[initialActiveCategory].contains(link)) {
                        closeInnerMenu();
                        selectCategory(initialActiveCategory);
                    } else {
                        closeInnerMenu();
                    }
                });
            });
        });


        closeMenuBtns.forEach(closeMenuBtn => {
            closeMenuBtn.addEventListener('click', event => {
                event.preventDefault();
                closeInnerMenu();
                selectCategory(initialActiveCategory);
            });
        })
      

        element.addEventListener('click', function(event) {
            if (event.target.matches('a') || event.target.matches('button')) {
                console.log(event.target);
            } else {
                closeInnerMenu();
                selectCategory(initialActiveCategory);
            }
        });

        // aboutBankLink.addEventListener('click', event => {
        //     event.preventDefault();
        //     if (!bankMenuOpen) {
        //         openBankMenu();
        //     } else {
        //         closeBankMenu();
        //     }
        // });

        autoScrollToActiveMenuItem();
    });
}
