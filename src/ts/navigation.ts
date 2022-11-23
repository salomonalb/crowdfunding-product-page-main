import openIcon from '../images/icon-hamburger.svg';
import closeIcon from '../images/icon-close-menu.svg';

export default function navigation() {

//Elements
const modalBackground = document.querySelector('#modal-background') as HTMLSpanElement;

const navMenu = document.querySelector('#nav-menu') as HTMLMenuElement;

const navButton  = document.querySelector('#nav-button') as HTMLButtonElement;

const navButtonImg = document.querySelector('#nav-button-img') as HTMLImageElement;

//Images


//Events
navButton.addEventListener('click', () => {
    
    if (navButton.ariaExpanded = "false") {
        
        modalBackground.style.display = "block";
        navMenu.style.display = "flex";
        navButtonImg.src = closeIcon;
        navButton.ariaExpanded = "true";
    } else {
        modalBackground.style.display = "none";
        navMenu.style.display = "none";
        navButtonImg.src = openIcon;
        navButton.ariaExpanded = "false";
    }
    
})
}