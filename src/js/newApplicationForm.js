import { gsap } from 'gsap';

import Inputmask from 'inputmask';

export default function newApplicationForm() {
    const elements = Array.from(document.querySelectorAll('.js-new-application-form'));

    elements.forEach(element => {
        const pagination = element.querySelector('.application__form-steps-numbers');

        const stepsContainer = element.querySelector('.application__form-steps-layers');

        const stepsItems = Array.from(stepsContainer.children);

        const stepsTotal = stepsItems.length;

        const nextBtn = element.querySelector('.js-form-next');
        const prevBtn = element.querySelector('.js-form-prev');

        const tabsContainer = element.querySelector('.application__form-inner-tabs-items');
        const tabItems = Array.from(tabsContainer.children);
        const tabCheckboxes = Array.from(element.querySelectorAll('.application__form-inner-tabs-checkbox-input'));

        const form = element;

        let activeStep = 0;
        let activeCheckboxIndex = tabCheckboxes.findIndex(box => box.checked);

        Array.from(element.querySelectorAll('[data-passport-series-mask]')).forEach(item => {
            const im = new Inputmask({
                mask: '9999',
                placeholder: ' ',
                showMaskOnHover: false,
                showMaskOnFocus: false
            });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-passport-number-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '999999', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-department-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '999', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-date-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '99.99.9999', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });
        Array.from(element.querySelectorAll('[data-snils-mask]')).forEach(item => {
            const im = new Inputmask({ mask: '999 999 999 99', placeholder: ' ', showMaskOnHover: false, showMaskOnFocus: false });
            im.mask(item);
        });

        $(form)
            .parsley()
            .on('field:validated', function() {
                const totalFields = Array.from(form.querySelectorAll('[data-affect-progress]'));

                const successFields = totalFields.filter(field => field.classList.contains('parsley-success'));

                // console.log('Total form fields', totalFields);
                // console.log('Success form fields', successFields);

                const progress = (successFields.length / totalFields.length).toFixed(2) * 100;

                // console.log('Progress', progress)

                document.documentElement.style.setProperty('--progress', `${progress}%`);
            });

        if (activeCheckboxIndex === -1) {
            throw new Error('No initial active mode checkbox');
        }

        function updatePagination(index) {
            pagination.innerHTML = `${index + 1} / ${stepsTotal}`;
        }

        function setStep(index) {
            const heightBefore = parseFloat(window.getComputedStyle(stepsContainer).getPropertyValue('height'));

            gsap.set(stepsContainer, {
                height: 'auto'
            });

            stepsItems.forEach(item => item.classList.remove('active'));
            stepsItems[index].classList.add('active');

            const heightAfter = parseFloat(window.getComputedStyle(stepsContainer).getPropertyValue('height'));

            gsap.fromTo(
                stepsContainer,
                { height: heightBefore },
                {
                    duration: 0.4,
                    height: heightAfter,
                    clearProps: 'all'
                }
            );

            activeStep = index;

            updatePagination(index);
        }

        function setTab(index) {
            const heightBefore = parseFloat(window.getComputedStyle(tabsContainer).getPropertyValue('height'));

            gsap.set(tabsContainer, {
                height: 'auto'
            });

            tabCheckboxes.forEach(box => (box.checked = false));
            tabItems.forEach(item => item.classList.remove('active'));
            tabCheckboxes[index].checked = true;
            tabItems[index].classList.add('active');

            const heightAfter = parseFloat(window.getComputedStyle(tabsContainer).getPropertyValue('height'));

            gsap.fromTo(
                tabsContainer,
                { height: heightBefore },
                {
                    duration: 0.4,
                    height: heightAfter,
                    clearProps: 'all'
                }
            );

            activeCheckboxIndex = index;
        }

        setStep(activeStep);
        setTab(activeCheckboxIndex);

        element.setStep = setStep;

        nextBtn.addEventListener('click', event => {
            event.preventDefault();
            const validationResult = $(form)
                .parsley()
                .validate({ group: 'firststep' });

            console.log('Validation result before next step', validationResult);

            if (!validationResult) return;

            if (activeStep + 1 < stepsTotal) {
                setStep(activeStep + 1);
            } else {
                return;
            }
        });

        prevBtn.addEventListener('click', event => {
            event.preventDefault();
            if (activeStep - 1 >= 0) {
                setStep(activeStep - 1);
            } else {
                return;
            }
        });

        tabCheckboxes.forEach((box, boxIndex) => {
            box.addEventListener('change', event => {
                event.preventDefault();
                setTab(boxIndex);
            });
        });
    });
}
