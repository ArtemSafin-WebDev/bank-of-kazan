import Inputmask from 'inputmask';

export default function() {
    const phoneInputs = Array.from(document.querySelectorAll('.js-phone-input'));
    phoneInputs.forEach(input => {
        Inputmask({ mask: '+7 (999) 999-99-99' }).mask(input);
    });
}