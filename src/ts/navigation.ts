//Images
import openIcon from '../images/icon-hamburger.svg';
import closeIcon from '../images/icon-close-menu.svg';

//Elements
const navBackground = document.querySelector('#nav-background') as HTMLSpanElement;

const navMenu = document.querySelector('#nav-menu') as HTMLMenuElement;

const navButton  = document.querySelector('#nav-button') as HTMLButtonElement;

const navButtonImg = document.querySelector('#nav-button-img') as HTMLImageElement;

//Functions
function openMenu() {

    navButton.ariaExpanded = "true";
    navButtonImg.src = closeIcon;
    navBackground.style.display = "block";
    navMenu.style.display = "flex";
}

function closeMenu() {
    
    navButton.ariaExpanded = "false";
    navButtonImg.src = openIcon
    navBackground.style.display = "none";
    navMenu.style.display = "none";
}

//Events mobile
navButton.addEventListener('click', () => {
    if (navButton.ariaExpanded === "false") {

        openMenu()

    } else if (navButton.ariaExpanded === "true") {

        closeMenu()

    }
})

navBackground.addEventListener('click', () => {
    closeMenu()
})

//Events Desktop

window.addEventListener('load', ()=> {
    
    if (window.innerWidth > 600) {
        navMenu.style.display = "flex" 
    }
    
})

//Resize Events 
window.addEventListener('resize', ()=> {
    closeMenu()
    if (window.innerWidth > 600) {
        navMenu.style.display = "flex"
        navButton.ariaExpanded = "true"
    } 
})