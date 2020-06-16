import { lockScroll, unlockScroll } from './scrollBlocker';

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function() {
 
    const bankMenu = document.querySelector('.bank-menu');
    const bankMenuSlot = document.querySelector('.navigation__bank-menu-slot');

    if (bankMenu && bankMenuSlot) {
        bankMenuSlot.appendChild(bankMenu)
    }

    const aboutBankBtn = document.querySelector('.page-header__about-bank-link');
    let aboutBankMenuOpen = false;
    const bankMenuInnerScrollContainer = document.querySelector('.bank-menu__inner');

    if (aboutBankBtn && bankMenuInnerScrollContainer) {
        aboutBankBtn.addEventListener('click', event => {
            event.preventDefault();
            aboutBankBtn.classList.toggle('active');
            if (!aboutBankMenuOpen) {
                document.body.classList.add('bank-menu-shown');
                aboutBankMenuOpen = true;
                gsap.to(window, {duration: .3, scrollTo: 0, clearProps: 'all', onComplete: () =>  lockScroll(bankMenuInnerScrollContainer)});
               
            } else {
                document.body.classList.remove('bank-menu-shown');
                aboutBankMenuOpen = false;
                unlockScroll();
            }
        });
    }
}
