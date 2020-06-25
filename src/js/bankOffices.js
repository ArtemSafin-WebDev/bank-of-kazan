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

            viewLayers[activeIndex].classList.add('active')
        }


        toggles.forEach(toggle => toggle.addEventListener('change', setActiveLayer))

        setActiveLayer();
    })
}