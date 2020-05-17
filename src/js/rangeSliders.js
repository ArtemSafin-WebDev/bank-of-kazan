import noUiSlider from 'noUiSlider';


let instances = [];

function init() {
    const rangeSliders = Array.from(document.querySelectorAll('.js-range-slider'));

    rangeSliders.forEach(element => {
        const input = element.querySelector('.range-slider__input');
        const container = element.querySelector('.range-slider__element');
        const displayedAmount = element.querySelector('.range-slider__amount');

        const min = input.hasAttribute('min') ? input.getAttribute('min') : 0;
        const max = input.hasAttribute('max') ? input.getAttribute('max') : 150000;
        const step = input.hasAttribute('step') ? input.getAttribute('step') : 500;
        const initialValue = input.value;

        noUiSlider.create(container, {
            start: [initialValue ? parseFloat(initialValue) : 1],
            connect: 'lower',
            orientation: 'horizontal',
            step: +step,
            range: {
                min: +min,
                max: +max
            }
        });

        container.noUiSlider.on('update', function() {
            const value = parseInt(container.noUiSlider.get(), 10);
            const event = new CustomEvent('rangeupdate', { value });
            input.value = value;
            input.dispatchEvent(event);
            displayedAmount.textContent = value.toLocaleString();
        });

        instances.push(container);
    });
}


function destroy() {
    instances.forEach(instance => instance.noUiSlider.destroy());
    instances = [];
}

export default {
    init, destroy
}
