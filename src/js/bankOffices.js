import accordions from './accordions';

export default function() {
    const bankOffices = Array.from(document.querySelectorAll('.js-bank-offices'));

    bankOffices.forEach(element => {
        const toggles = Array.from(element.querySelectorAll('.js-offices-results-view-toggle'));
        const viewLayers = Array.from(element.querySelectorAll('.js-offices-results-view'));

        function setActiveLayer() {
            const activeIndex = toggles.findIndex(toggle => toggle.checked);
            if (activeIndex === -1) {
                console.error('Active toggle not found');
                return;
            }

            viewLayers.forEach(layer => layer.classList.remove('active'));

            viewLayers[activeIndex].classList.add('active');
        }

        toggles.forEach(toggle => toggle.addEventListener('change', setActiveLayer));

        setActiveLayer();
    });

    let officesAccordions = accordions(Array.from(document.querySelectorAll('.js-offices-accordion')));

    officesAccordions.init();

    var target = document.getElementById('map-list');


    if (!target) return;

    // Конфигурация observer (за какими изменениями наблюдать)
    const config = {
        attributes: false,
        childList: true,
        subtree: false
    };

    // Функция обратного вызова при срабатывании мутации
    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');

                officesAccordions.destroy();
                officesAccordions = accordions(Array.from(document.querySelectorAll('.js-offices-accordion')));
                officesAccordions.init();
            }
        }
    };

    // Создаем экземпляр наблюдателя с указанной функцией обратного вызова
    const observer = new MutationObserver(callback);

    // Начинаем наблюдение за настроенными изменениями целевого элемента
    observer.observe(target, config);
}
