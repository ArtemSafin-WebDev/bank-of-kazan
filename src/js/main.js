import polyfills from './polyfills';
import detectTouch from './detectTouch';
import ratingStars from './ratingStars';
import phoneMask from './phoneMask';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    ratingStars();
    phoneMask();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
})
