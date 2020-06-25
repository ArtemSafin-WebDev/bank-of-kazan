function init() {
    // const onlyNumeric = Array.from(document.querySelectorAll('.js-only-numeric'));

    // function setInputFilter(textbox, inputFilter) {
    //     ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
    //         textbox.oldValue = '';
    //         textbox.addEventListener(event, function() {
    //             if (inputFilter(this.value)) {
    //                 this.oldValue = this.value;
    //                 this.oldSelectionStart = this.selectionStart;
    //                 this.oldSelectionEnd = this.selectionEnd;
    //             } else if (this.hasOwnProperty('oldValue')) {
    //                 this.value = this.oldValue;
    //                 this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    //             }
    //         });
    //     });
    // }

    // onlyNumeric.forEach(input => {
    //     setInputFilter(input, function(value) {
    //         return /^\d*$/.test(value);
    //     });
    // });
}

export default {
    init
};
