//Images
import openIcon from '../images/icon-hamburger.svg';
import closeIcon from '../images/icon-close-menu.svg';

//Elements
const modalBackground = document.querySelector('#modal-background') as HTMLSpanElement;

const navMenu = document.querySelector('#nav-menu') as HTMLMenuElement;

const navButton  = document.querySelector('#nav-button') as HTMLButtonElement;

const navButtonImg = document.querySelector('#nav-button-img') as HTMLImageElement;

//Events
navButton.addEventListener('click', () => {

    //openMenu()
    modalBackground.style.display = "block";
    navMenu.style.display = "flex";
    navButtonImg.src = closeIcon;
    navButton.dataset.open = "true";
    console.log('lo abriste');

})

modalBackground.addEventListener('click', () => {

    //closeMenu()
    modalBackground.style.display = "none";
    navMenu.style.display = "none";
    navButtonImg.src = openIcon;
    navButton.dataset.open = "false";
    console.log('lo cerraste');
})