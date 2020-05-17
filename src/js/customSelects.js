import 'select2';

function init() {
    $('.js-custom-select').each(function() {
        let currentSelect = $(this);

        currentSelect.select2({
            minimumResultsForSearch: -1,
            dropdownParent: currentSelect.parent()
        });

        const handler = function() {
            const event = new CustomEvent('choose');
            currentSelect.dispatchEvent(event);
        };

        currentSelect.on('change', handler);
    });
}

function destroy() {
    $('.js-custom-select').each(function() {
        let currentSelect = $(this);

        currentSelect.select2('destroy');
    });
}

export default {
    init,
    destroy
};
