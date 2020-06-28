import noUiSlider from 'noUiSlider';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { debounce } from 'lodash';

momentDurationFormatSetup(moment);

moment.updateLocale('ru', {
    durationLabelsStandard: {
        M: 'месяц',
        MM: 'месяца',
        MMM: 'месяцев',
        y: 'год',
        yy: 'года',
        yyy: 'лет'
    },
    durationPluralKey: function(token, integerValue, decimalValue) {
        if (integerValue === 1) {
            return token;
        } else if (integerValue > 1 && integerValue <= 4) {
            return token + token;
        } else {
            return token + token + token;
        }
    }
});

moment.locale('ru');

function init() {
    const rangeSliders = Array.from(document.querySelectorAll('.js-range-slider'));

    rangeSliders.forEach(slider => {
        const rangeInput = slider.querySelector('.range-slider__input');
        const customRangeSliderElement = slider.querySelector('.range-slider__element');
        const displayedAmountElement = slider.querySelector('.range-slider__amount');
        const manualInput = displayedAmountElement.matches('input');
        const minValue = rangeInput.hasAttribute('min') ? cleanInput(rangeInput.getAttribute('min')) : 0;
        const maxValue = rangeInput.hasAttribute('max') ? cleanInput(rangeInput.getAttribute('max')) : 150000;
        const stepValue = rangeInput.hasAttribute('step') ? cleanInput(rangeInput.getAttribute('step')) : 500;
        const units = rangeInput.hasAttribute('data-units') ? rangeInput.getAttribute('data-units') : 'rub';
        let initialRangeValue = checkValue(cleanInput(rangeInput.value));

        function cleanInput(value) {
            return parseInt(value.toString().replace(/\s/g, ''), 10);
        }

        function checkValue(value) {
            if (value > maxValue) {
                return maxValue;
            } else if (value < minValue || !value) {
                return minValue;
            } else {
                return value;
            }
        }

        function handleManualInput(event) {
            const value = event.target.value;
            let cleanedValue = cleanInput(value);
            if (isNaN(cleanedValue)) cleanedValue = '';
            customRangeSliderElement.noUiSlider.set(cleanedValue);

            setValue(cleanedValue);
        }

        const checkManualInput = debounce(function(event) {
            const value = event.target.value;
            const clearedValue = checkValue(cleanInput(value));
            setValue(clearedValue);
        }, 900);

        function setValue(value) {
            dispatchRangeUpdateEvent(value);
            rangeInput.value = value;

            const formattedValue = formatValue(value);

            if (manualInput) {
                displayedAmountElement.value = formattedValue;
            } else {
                displayedAmountElement.textContent = formattedValue;
            }
        }

        function addDivisions(value) {
            return value.toLocaleString();
            // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        function monthsToHumanReadable(value) {
            const duration = moment.duration(value, 'months');
            const formattedDuration = duration.format('Y __ M __', {
                trim: 'small',
                userLocale: 'ru'
            });
            return formattedDuration;
        }

        function formatValue(value) {
            if (units === 'months') {
                return monthsToHumanReadable(value);
            } else {
                return addDivisions(value);
            }
        }

        function dispatchRangeUpdateEvent(value) {
            const event = new CustomEvent('rangeupdate', { detail: value });
            rangeInput.dispatchEvent(event);
        }

        noUiSlider.create(customRangeSliderElement, {
            start: [initialRangeValue || 1],
            connect: 'lower',
            orientation: 'horizontal',
            step: stepValue,
            range: {
                min: minValue,
                max: maxValue
            }
        });

        customRangeSliderElement.noUiSlider.on('update', () => {
            const newValue = cleanInput(customRangeSliderElement.noUiSlider.get());
            setValue(newValue);
        });

        if (manualInput) {
            displayedAmountElement.addEventListener('input', handleManualInput);
            displayedAmountElement.addEventListener('input', checkManualInput);
        }
    });
}

function initWithExceptionHandling() {
    try {
        init();
    } catch (err) {
        console.error('error');
    }
}

function destroy() {}

export default {
    init: initWithExceptionHandling,
    destroy
};
