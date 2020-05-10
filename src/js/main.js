import polyfills from './polyfills';
import detectTouch from './detectTouch';
import ratingStars from './ratingStars';
import phoneMask from './phoneMask';
import tabs from './tabs';
import customSelects from './customSelects';
import rangeSliders from './rangeSliders';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    ratingStars();
    phoneMask();
    tabs();
    customSelects();
    rangeSliders();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
})
