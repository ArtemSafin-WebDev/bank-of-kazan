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
import forBusiness from './forBusiness';
import productNav from './productNav';
import barba from '@barba/core';
// import css from '@barba/css';
import { gsap } from 'gsap';
import scrollAnimations from './scrollAnimations';


document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    navigation();
    mobileMenu();
    productNav();
    scrollAnimations();

    barba.init({
        
        transitions: [
            {
                name: 'opacity-transition',
                leave: data => {
                    return new Promise(resolve => {
                        gsap.to(data.current.container, {
                            opacity: 0,
                            duration: 0.15,
                            onComplete: () => {
                                gsap.set(data.current.container, {
                               
                                    display: 'none'
                                });
                                resolve();
                            }
                        });
                    });
                },
                enter: data => {
                    return new Promise(resolve => {
                        gsap.from(data.next.container, {
                            duration: 0.15,
                            opacity: 0,
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
                    console.log('Before leave')
                    ratingStars.destroy();
                    phoneMask.destroy();
                    tabs.destroy();
                    productsSlider.destroy();
                    rangeSliders.destroy();
                    customSelects.destroy();
                    forBusiness.destroy();
                    document.body.classList.add('category-toggles-off');
                },

                afterEnter() {
                    console.log('After enter')
                    ratingStars.init();
                    phoneMask.init();
                    tabs.init();
                    customSelects.init();
                    rangeSliders.init();
                    productsSlider.init();
                    forBusiness.init();
                    document.body.classList.remove('category-toggles-off');
                }
            }
        ]
    });

    document.addEventListener('click', function(event) {
        if (event.target.matches('.js-barba-link') || event.target.closest('.js-barba-link')) {
            event.preventDefault();
            const href = event.target.href;

            if (barba.transitions.isRunning) return;

            barba.go(href);
        }
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
