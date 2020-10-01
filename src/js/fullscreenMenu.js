import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { lockScroll, unlockScroll } from './scrollBlocker';

gsap.registerPlugin(ScrollToPlugin);

export default function fullscreenMenu() {
    const catalogMenu = document.querySelector('.catalog__menu');

    const fullscreenMenu = document.querySelector('.fullscreen-nav-menu');

    if (catalogMenu && fullscreenMenu) {
        const links = Array.from(catalogMenu.children);

        const initialActiveLinkIndex = links.findIndex(element => element.classList.contains('active'));

        const contentLayers = Array.from(fullscreenMenu.querySelectorAll('.js-product-nav-menu-item'));

        const productNavClose = fullscreenMenu.querySelector('.js-product-nav-close')

        let menuOpen = false;

        function selectLayer(index) {
            contentLayers.forEach(layer => layer.classList.remove('active'));

            contentLayers[index].classList.add('active');
        }

        function openMenu() {
            gsap.to(window, { duration: 0.3, scrollTo: 0, clearProps: 'all', onComplete: () => lockScroll(fullscreenMenu) });
            menuOpen = true;
            document.body.classList.add('product-nav-menu-open');
        }

        function closeMenu() {
            unlockScroll();
            menuOpen = false;
            document.body.classList.remove('product-nav-menu-open');
            links.forEach(link => link.classList.remove('active'));

            links[initialActiveLinkIndex].classList.add('active');
        }

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();


                if (!menuOpen) {
                    openMenu();
                } else if (menuOpen && link.classList.contains('active')) {
                    return closeMenu();
                }
                links.forEach(link => link.classList.remove('active'));

                link.classList.add('active');

                

                selectLayer(linkIndex);
            });
        });

        productNavClose.addEventListener('click', event => {
            event.preventDefault();
            closeMenu();
        })
    }
}
