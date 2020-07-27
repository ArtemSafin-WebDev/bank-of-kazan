import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

let instances = [];

function init() {
    const anchorLinks = Array.from(document.querySelectorAll('.js-anchor-link'));

    anchorLinks.forEach(link => {
        const handler = (link, event) => {
            event.preventDefault();
            const hash = link.hash;
            gsap.to(window, { duration: 2, scrollTo: hash });
        };
        link.addEventListener('click', handler.bind(this, link));

        instances.push({
            link,
            handler
        });
    });

    // if (window.location.hash) {
    //     gsap.to(window, { duration: 2, scrollTo: window.location.hash });
    // }
}

function destroy() {
    instances.forEach(instance => instance.link.removeEventListener('click', instance.handler));
    instances = [];
    
}

export default {
    init,
    destroy
};
