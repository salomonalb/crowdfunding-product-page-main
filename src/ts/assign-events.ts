import { projectData } from "./project-data";
import { rederProject } from "./render-project";

export function assignEvents() {
    /* get an array of buttons in the main page which will open the modal, get the modal, the modal background and the close button */
const buttons = document.querySelectorAll('[data-open-modal="true"]');
const selectModal = document.querySelector('#select-modal') as HTMLElement;
const selectModalBackground = document.querySelector('#select-modal-background') as HTMLSpanElement;
const closeButton = document.querySelector('#close-select-modal') as HTMLButtonElement;
const modalRewardCards = document.querySelectorAll('[data-selected]');

/* for each button add a event to open the modal and give it focus */
buttons.forEach(button => {
    button.addEventListener('click', ()=> {
        selectModal.dataset.open = "true";
        selectModalBackground.dataset.open = "true";
        let element = selectModal.firstElementChild as HTMLElement;
        element.tabIndex = 0;
        element.focus()
    })
})

/* for the background and the close button onckick close the modal */
selectModalBackground.addEventListener('click', ()=> {
    selectModal.dataset.open = "false";
    selectModalBackground.dataset.open = "false";
})

closeButton.addEventListener('click', ()=> {
    selectModal.dataset.open = "false";
    selectModalBackground.dataset.open = "false";
})

/* get an array with the cards rewards in the modal */

/* add the events */
modalRewardCards.forEach((element, index, cardsArray) => {

    /* get the card itself, the radio button and the input */
    const rewardCard = element as HTMLElement;
    const checkbox  = rewardCard.querySelector('.select-reward__checkbox') as HTMLInputElement;
    const amountInput = rewardCard.querySelector('.select-reward__selected-input') as HTMLInputElement;
    /* add an event that if not checked checks the card and the radio and uncheks the other cards, behaving like radio buttons, if checked it simply uncheks */
    rewardCard.addEventListener('click', ()=> {
        if (!checkbox.checked) {
            checkbox.checked = true;
            rewardCard.dataset.selected = "true";
            cardsArray.forEach(card => {
                if (card.id === rewardCard.id) {
                    return
                }
                let cardEl = card as HTMLElement;
                cardEl.dataset.selected = "false"
            })
        } else if (checkbox.checked) {
            checkbox.checked = false;
            rewardCard.dataset.selected = "false";
        }
    })
    /* make clicking on the radio buttons directly also activate the data attribute of the card */
    checkbox.addEventListener('click', ()=> {
        if (!checkbox.checked) {
            checkbox.checked = true;
            rewardCard.dataset.selected = "true";   
        } else if (checkbox.checked) {
            checkbox.checked = false;
            rewardCard.dataset.selected = "false";
        }
    })
    /* stop the propagation of the click so when you click the input it doesnt close the card*/
    amountInput.addEventListener('click', (e)=> {
        e.stopPropagation()
    })
    /* if the numbers written exceed 4 digits, limit to 4 digits */
    amountInput.addEventListener('input', (e)=> {
        if (amountInput.value.length > 4) {
            amountInput.value = amountInput.value.slice(0,4); 
        }
    })
})



    /* add the event to the button, to change the data-attribute and also modify the data inside the object */


/* i will have to erase this events, becuse the succes modal should not open on click but on "submit", */ 

const openSuccessButtons = document.querySelectorAll('[data-opensuccess="true"]');

const successModal = document.querySelector('#sucm') as HTMLElement ;
const successBackground = document.querySelector('#sucb') as HTMLSpanElement;
const buttonSuccess = document.querySelector('#button-success') as HTMLButtonElement;


openSuccessButtons.forEach(button => {
    button.addEventListener('click', (event)=> {
        event.stopPropagation()
    })
    })

    function openSuccessModal() {
        selectModal.dataset.open = "false";
        selectModalBackground.dataset.open = "false";
        successBackground.dataset.modalsuccess = "true"
        successModal.dataset.modalsuccess = "true";
        successModal.focus();
    }

    
    /* close the succes modal */
    
    successBackground.addEventListener('click', ()=> {
        successModal.dataset.modalsuccess = "false";
        successBackground.dataset.modalsuccess = "false";
        rederProject(projectData)
        assignEvents()
    })

    buttonSuccess.addEventListener('click', ()=> {
        successModal.dataset.modalsuccess = "false";
        successBackground.dataset.modalsuccess = "false";
        rederProject(projectData)
        assignEvents()
    })




    /* get the forms inside the reward cards of the select modal */
    const forms = document.querySelectorAll('.select-reward__selected-row');

    /* prevent the submission of the form*/
    forms.forEach( form => {
        form.addEventListener('submit', (e)=> {
            //stop the form from submitting
            e.preventDefault();
            //get the input inside the form
            const inputNumber = form.querySelector('input') as HTMLInputElement;
            projectData.rewards.forEach(reward => {
                //check if the minimun pldge is the same as the minumun attribute, because this means that the reward and its HTML representation match
                if (Number(inputNumber.min) === reward.minimunPledge)    {
                    projectData.backed.increaseCurrentAmount(Number(inputNumber.value))
                    reward.decreaseQuantity()
                    projectData.backed.increaseTotalBackers()
            }
        })
            openSuccessModal()

        })
    })
}