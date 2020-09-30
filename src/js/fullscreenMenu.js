export default function fullscreenMenu() {
    const catalogMenu = document.querySelector('.catalog__menu');

    const fullscreenMenu = document.querySelector('.fullscreen-nav-menu');

    if (catalogMenu && fullscreenMenu) {
        const links = Array.from(catalogMenu.children);

        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                links.forEach(link => link.classList.remove('active'))
                document.body.classList.add('product-nav-menu-open');
                link.classList.add('active')
            })
        })
    }
}