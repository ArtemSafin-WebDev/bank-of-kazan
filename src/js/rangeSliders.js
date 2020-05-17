import noUiSlider from 'noUiSlider';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';





momentDurationFormatSetup(moment);

moment.locale('ru');





console.log('Moment locale', moment.locale())

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

        const units = input.getAttribute('data-units');

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

            if (units === 'months') {
                const duration = moment.duration(value, 'months');

                displayedAmount.textContent = duration.format('Y [years] M [months]', {
                    trim: 'small',
                    userLocale: 'ru'
                });
            } else {
                displayedAmount.textContent = value.toLocaleString();
            }
        });

        instances.push(container);
    });
}

function destroy() {
    instances.forEach(instance => instance.noUiSlider.destroy());
    instances = [];
}

export default {
    init,
    destroy
};
