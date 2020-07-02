import polyfills from './polyfills';
import detectTouch from './detectTouch';
import ratingStars from './ratingStars';
import phoneMask from './phoneMask';
import tabs from './tabs';
import customSelects from './customSelects';
import rangeSliders from './newRangeSliders';
import productsSlider from './productsSlider';
import navigation from './navigation';
import mobileMenu from './mobileMenu';
import forBusiness from './forBusiness';
import productNav from './productNav';
import barba from '@barba/core';
import { gsap } from 'gsap';
import scrollAnimations from './scrollAnimations';
import accordions from './accordions';
import rkoFeatures from './rkoFeatures';
import openAccount from './openAccount';
import bankMenu from './bankMenu';
import articleAdvantages from './articleAdvantages';
import bankOffices from './bankOffices';
import modals from './modals';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    navigation();
    mobileMenu();
    productNav();
    scrollAnimations();
    accordions();
    rkoFeatures();
    openAccount();
    bankMenu();
    articleAdvantages();
    bankOffices();
    modals();
    barba.init({
        debug: true,
        logLevel: 'error',
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
                    console.log('Before leave');
                    tabs.destroy();
                    ratingStars.destroy();
                    phoneMask.destroy();
                   
                    productsSlider.destroy();
                    rangeSliders.destroy();
                    customSelects.destroy();
                    forBusiness.destroy();
                    document.body.classList.add('category-toggles-off');

                    if (window.destroyBackendScripts && typeof window.destroyBackendScripts === 'function') {
                        window.destroyBackendScripts();
                    }
                },

                afterEnter() {
                    console.log('After enter');
                    tabs.init();
                   
                    ratingStars.init();
                   
                    phoneMask.init();
                   
                    customSelects.init();
                    rangeSliders.init();
                   
                    forBusiness.init();
                    productsSlider.init();
                    console.log('Error is here')
                   
                    document.body.classList.remove('category-toggles-off');

                    if (window.initBackendScripts && typeof window.initBackendScripts === 'function') {
                        window.initBackendScripts();
                    } 
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
