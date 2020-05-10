import noUiSlider from 'noUiSlider';
import 'select2';

class CurrencyExchange {
    constructor(element) {
        this.elements = {
            firstCurrencyAmountInput: element.querySelector('input[type="range"][name="first-currency-amount"]'),
            secondCurrencyAmountInput: element.querySelector('input[type="range"][name="second-currency-amount"]'),
            ratioInput: element.querySelector('.currency__card-calculate-widget-ratio-input'),
            firstCurrencyNameInput: element.querySelector('select[name="first-currency-name"]'),
            secondCurrencyNameInput: element.querySelector('select[name="second-currency-name"]'),
            firstCurrencyRangeElement: element.querySelector('input[type="range"][name="first-currency-amount"] ~ .currency__card-calculate-widget-range-element'),
            secondCurrencyRangeElement: element.querySelector('input[type="range"][name="second-currency-amount"] ~ .currency__card-calculate-widget-range-element')
        };

        for (let key of Object.keys(this.elements)) {
            if (!this.elements[key]) {
                throw new Error('Element not present', key);
            }
        }

        const { firstCurrencyAmountInput, secondCurrencyAmountInput, ratioInput } = this.elements;

        this.state = {
            exchangeRatio: ratioInput.value,
            firstCurrency: {
                minValue: firstCurrencyAmountInput.hasAttribute('min') ? firstCurrencyAmountInput.getAttribute('min') : 0,
                maxValue: firstCurrencyAmountInput.hasAttribute('max') ? firstCurrencyAmountInput.getAttribute('max') : 150000,
                step: firstCurrencyAmountInput.hasAttribute('step') ? firstCurrencyAmountInput.getAttribute('step') : 500,
                currentAmount: parseFloat(firstCurrencyAmountInput.value)
            },
            secondCurrency: {
                minValue: secondCurrencyAmountInput.hasAttribute('min') ? secondCurrencyAmountInput.getAttribute('min') : 0,
                maxValue: secondCurrencyAmountInput.hasAttribute('max') ? secondCurrencyAmountInput.getAttribute('max') : 150000,
                step: secondCurrencyAmountInput.hasAttribute('step') ? secondCurrencyAmountInput.getAttribute('step') : 500,
                currentAmount: parseFloat(secondCurrencyAmountInput.value)
            }
        };
    }

    

    

    calculate() {}
}

function initialize() {
    const elements = Array.from(document.querySelectorAll('.js-currency-exchange'));
    elements.forEach(element => new CurrencyExchange(element));
}

export default initialize;
