export default function() {
    const productNavElements = Array.from(document.querySelectorAll('.js-product-nav'));

    productNavElements.forEach(element => {
        const categoryLinks = Array.from(element.querySelectorAll('.js-product-nav-category-link'));
        const menuLinks = Array.from(element.querySelectorAll('.js-product-nav-menu-link'));
        const categoryLayers = Array.from(element.querySelectorAll('.js-product-nav-layer'));
        const menuItems = Array.from(element.querySelectorAll('.js-product-nav-menu-item'));
        const searchForm = element.querySelector('.js-product-navigation-search-form');
        const searchBtn = element.querySelector('.js-product-nav-search-btn');
        const closeBtn = element.querySelector('.js-product-nav-close-btn');
        const closeMenuBtn = element.querySelector('.js-product-nav-close');
        const aboutBankLink = document.querySelector('.page-header__about-bank-link');
        const bankMenuLayer = element.querySelector('.js-bank-menu-layer');
        let searchFormOpen = false;
        let bankMenuOpen = false;
        let categoryIndex = categoryLayers.findIndex(element => element.classList.contains('active'));
        let initialActiveNavLink = menuLinks.findIndex(element => element.classList.contains('active'));
        let initialActiveCategory = categoryLinks.findIndex(element => element.classList.contains('active'));

        console.log('Menu items', menuItems);
        console.log('Menu btns', menuLinks);

        function openBankMenu() {
            categoryLinks.forEach(link => link.classList.remove('active'));
            categoryLayers.forEach(layer => layer.classList.remove('active'));
            bankMenuLayer.classList.add('active');
            closeInnerMenu();
            element.classList.add('bank-menu-open');
            aboutBankLink.classList.add('active');
            element.classList.remove('search-form-open');
            searchFormOpen = false;
            bankMenuOpen = true;
        }

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

        function closeBankMenu() {
            selectCategory(categoryIndex);
            bankMenuLayer.classList.remove('active');
            closeInnerMenu();
            element.classList.remove('bank-menu-open');
            aboutBankLink.classList.remove('active');
            bankMenuOpen = false;
        }

        function closeInnerMenu() {
            menuLinks.forEach(link => link.classList.remove('active'));
            menuItems.forEach(item => item.classList.remove('active'));
            element.classList.remove('product-nav-menu-open');
        }

        function handleMenuClick(index) {
            menuLinks.forEach(link => link.classList.remove('active'));
            menuLinks[index].classList.add('active');
            menuItems.forEach(item => item.classList.remove('active'));
            menuItems[index].classList.add('active');
            element.classList.add('product-nav-menu-open');
        }

        function selectCategory(index) {
            categoryLinks.forEach(link => link.classList.remove('active'));
            categoryLinks[index].classList.add('active');
            categoryLayers.forEach(layer => layer.classList.remove('active'));
            categoryLayers[index].classList.add('active');
            categoryIndex = index;
            closeInnerMenu();

            if (initialActiveNavLink !== -1 && initialActiveCategory !== categoryIndex) {
                handleMenuClick(initialActiveNavLink);
            }
        }

        searchBtn.addEventListener('click', event => {
            event.preventDefault();
            if (!searchFormOpen) {
                element.classList.add('search-form-open');
                searchFormOpen = true;
            } else {
                searchForm.submit();
            }
        });

        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            if (searchFormOpen) {
                element.classList.remove('search-form-open');
                searchFormOpen = false;
                searchForm.reset();
            }
        });

        categoryLinks.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                console.log('Selected category', linkIndex + 1);
                selectCategory(linkIndex);
            });
        });

        menuLinks.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                if (!link.classList.contains('active')) {
                    handleMenuClick(linkIndex);
                } else {
                    // closeInnerMenu();
                }
            });
        });

        closeMenuBtn.addEventListener('click', event => {
            event.preventDefault();
            closeInnerMenu();
            selectCategory(initialActiveCategory);
        });

        aboutBankLink.addEventListener('click', event => {
            event.preventDefault();
            if (!bankMenuOpen) {
                openBankMenu();
            } else {
                closeBankMenu();
            }
        });

        autoScrollToActiveMenuItem();
    });
}
