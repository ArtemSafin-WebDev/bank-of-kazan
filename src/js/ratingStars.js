export default function() {
    const ratingBlocks = Array.from(document.querySelectorAll('.js-rating-stars'));

    ratingBlocks.forEach(element => {
        const starsCheckboxes = Array.from(element.querySelectorAll('.rating__form-star-input'));
        const totalRatingInput = element.querySelector('.rating__form-total-rating');

        function setInitialrating() {
            const totalRating = starsCheckboxes.reduce((accumulator, currentElement) => {
                return accumulator + (currentElement.checked ? 1 : 0);
            }, 0);

            totalRatingInput.value = totalRating;
        }

        function handleRatingChange(index) {
            let totalRating = 0;
            starsCheckboxes.forEach((checkbox, checkboxIndex) => {
                checkbox.checked = false;
                if (checkboxIndex <= index) {
                    checkbox.checked = true;
                    totalRating++;
                }
            });

            totalRatingInput.value = totalRating;
        }

        setInitialrating();

        starsCheckboxes.forEach((checkbox, checkboxIndex) => {
            checkbox.addEventListener('change', () => {
                handleRatingChange(checkboxIndex);
            });
        });
    });
}
