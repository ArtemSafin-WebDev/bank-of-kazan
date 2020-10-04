export default function pageHeaderContacts() {
    const element = document.querySelector('.js-page-header-contacts')


    if (element) {
        element.addEventListener('click', event => {
            event.preventDefault();
            element.classList.toggle('active');
        });


        element.addEventListener('mouseenter', event => {
            element.classList.add('active');
        })
        element.addEventListener('mouseleave', event => {
            element.classList.remove('active');
        })


        document.addEventListener('click', event => {
            if (event.target.matches('.js-page-header-contacts') || event.target.closest('.js-page-header-contacts')) {
                return;
            } else {
                element.classList.remove('active');
            }
        })
    }

   
}