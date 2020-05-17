import polyfills from './polyfills';
import detectTouch from './detectTouch';
import ratingStars from './ratingStars';
import phoneMask from './phoneMask';
import tabs from './tabs';
import customSelects from './customSelects';
import rangeSliders from './rangeSliders';
import productsSlider from './productsSlider';
import navigation from './navigation';
import mobileMenu from './mobileMenu';

import barba from '@barba/core';
import css from '@barba/css';
import { gsap } from 'gsap';


document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    navigation();
    mobileMenu();
    // ratingStars.init();
    // phoneMask.init();
    // tabs.init();
    // customSelects.init();
    // rangeSliders.init();
    // productsSlider.init();

    // barba.use(css);

    barba.init({
        // sync: true,
        transitions: [
            {
                name: 'opacity-transition',
                leave: data => {
                    return new Promise(resolve => {
                        gsap.to(data.current.container, {
                            opacity: 0,
                            onComplete: () => {
                                gsap.set(data.current.container, {
                                    position: 'absolute',
                                    visibility: 'hidden'
                                });
                                resolve();
                            }
                        });
                    });
                },
                enter: data => {
                    return new Promise(resolve => {
                        gsap.from(data.next.container, {
                            duration: 0.7,
                            opacity: 0,
                            // y: 100,
                            onComplete: () => {
                                resolve();
                            }
                        });
                    });
                }
            }
        ],
        views: [
            {
                namespace: 'home',

                beforeLeave() {
                    ratingStars.destroy();
                    phoneMask.destroy();
                    tabs.destroy();
                    productsSlider.destroy();
                    rangeSliders.destroy();
                    customSelects.destroy();
                },

                afterEnter() {
                    ratingStars.init();
                    phoneMask.init();
                    tabs.init();
                    customSelects.init();
                    rangeSliders.init();
                    productsSlider.init();
                }
            }
        ]
    });

    document.addEventListener('click', function(event) {
        if (event.target.matches('.js-barba-link') || event.target.closest('.js-barba-link')) {
            event.preventDefault();
            const href = event.target.href;

            barba.go(href);
        }
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
