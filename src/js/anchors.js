import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

let instances = [];

function init() {
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            if (hash && hash.startsWith('#to-')) {
               
                event.preventDefault();

                const elementToScroll = document.getElementById(hash.replace(/^#to\-/, ''));
                if (elementToScroll) {
                    gsap.to(window, { duration: 2, scrollTo: elementToScroll });
                }
            }
        }
    });
}

function destroy() {
    instances.forEach(instance => instance.link.removeEventListener('click', instance.handler));
    instances = [];
}

export default {
    init,
    destroy
};
