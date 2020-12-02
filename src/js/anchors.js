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
                const elementToScroll = document.getElementById(hash.replace(/^#to\-/, ''));

                if (elementToScroll) {
                    event.preventDefault();

                    gsap.to(window, {
                        duration: 2,
                        scrollTo: {
                            y: elementToScroll,
                            autoKill: true,
                            offsetY: 60
                           
                        }
                    });
                }
            }
        }
    });

    window.addEventListener('load', () => {
        if (window.location.hash && window.location.hash.startsWith('#to-')) {
            console.log('Window hash', window.location.hash);
            const elementToScroll = document.getElementById(window.location.hash.replace(/^#to\-/, ''));

            if (elementToScroll) {
                setTimeout(() => {
                    gsap.to(window, {
                        duration: 2,
                        scrollTo: {
                            y: elementToScroll,
                            autoKill: true,
                            offsetY: 60
                            
                        }
                    });
                }, 50);
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
