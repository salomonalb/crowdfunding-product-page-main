/*

To do

add the amount to the object
reduce the quantity left by one,
update and re render the current amount and the lenght of the bar

make clicking a specific reward focus that reward on the modal
trap focus, trap scrolling. make modals appear in the center of the screen;
make the inputs erase when you click another thing
make the cards de-select when you get outside the modal
make the card 'clickable' with the keyboards
add commas to the ouput numbers

on invalid input change the color of the entire card border, buttons, 


*/






/* project data*/
const projectData = {
    "title": "Mastercraft Bamboo Monitor Riser", 
    "shortDescription": "A beautifully handcrafted monitor stand to reduce neck and eye strain.",
    "longDescription": {
        "p1": "The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.",
        "p2": "Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand."
    },
    "isBookmarked": false,
    set bookmark(boolParam: boolean) {
        if ( typeof boolParam  === 'boolean') {
            this.isBookmarked = boolParam;
        }
    },
    "backed": {
        "currentAmount": 77914,
        "totalBackers": 5007,
        "objective": 100000,
        increaseCurrentAmount(amount: number) {
            alert(this.currentAmount)
            this.currentAmount += amount;
            alert(this.currentAmount)
        },
        increaseTotalBackers() {
            alert(this.totalBackers)
            this.totalBackers++
            alert(this.totalBackers)
        }
    },
    "daysLeft": 56,
    "rewards": [
        {
            "title": "Pledge with no reward",
            "description": "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
            "minimunPledge": 1,
            "quantityLeft": Infinity,
            decreaseQuantity() {
                alert(this.quantityLeft)
                this.quantityLeft -= 1;
                alert(this.quantityLeft)
            }
        },
        {
            "title": "Bamboo Stand",
            "description": "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.",
            "quantityLeft": 101,
            "minimunPledge": 25,
            decreaseQuantity() {
                alert(this.quantityLeft)
                this.quantityLeft -= 1;
                alert(this.quantityLeft)
            }
        },
        {
            "title": "Black Edition Stand",
            "description": "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            "quantityLeft": 64,
            "minimunPledge": 75,
            decreaseQuantity() {
                alert(this.quantityLeft)
                this.quantityLeft -= 1;
                alert(this.quantityLeft)
            }
        },
        {
            "title": "Mahogany Special Edition",
            "description": "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            "quantityLeft": 0,
            "minimunPledge": 200,
            decreaseQuantity() {
                alert(this.quantityLeft)
                this.quantityLeft -= 1;
                alert(this.quantityLeft)
            }
        }
    ],
    pledge(quantity: number) {
        // how to select the specific reward object depending on the form that calls the function? maybe make the function a method of the reward
    }
}

/* Initial render of the proyect */
function rederProject(projectData) {

    /* Get the layout */
    const titleElement = document.querySelector('#title-el') as HTMLHeadingElement;
    const shortDescriptionElement = document.querySelector('#short-desc-el') as HTMLParagraphElement;
    const currentAmountElement = document.querySelector('#current-amount')  as HTMLParagraphElement;
    const objectiveElement = document.querySelector('#objective')  as HTMLParagraphElement;
    const totalBackersElement = document.querySelector('#total-backers')  as HTMLParagraphElement;
    const daysLeftElement = document.querySelector('#days-left')  as HTMLParagraphElement;
    const longDescriptionElement1 = document.querySelector('#long-desc-p1') as HTMLParagraphElement;
    const longDescriptionElement2 = document.querySelector('#long-desc-p2') as HTMLParagraphElement;
    const aboutSection = document.querySelector('#about') as HTMLElement;
    const modalRewardsContainer = document.querySelector('#modal-rewards') as HTMLDivElement;

    /* populate the layout with data */
    titleElement.textContent = projectData.title;
    shortDescriptionElement.textContent = projectData.shortDescription;
    currentAmountElement.textContent =`$${projectData.backed.currentAmount}`;
    objectiveElement.textContent = `of $${projectData.backed.objective} backed`;
    totalBackersElement.textContent = `${projectData.backed.totalBackers}`;
    daysLeftElement.textContent = `${projectData.daysLeft}`;
    longDescriptionElement1.textContent = projectData.longDescription.p1;
    longDescriptionElement2.textContent = projectData.longDescription.p2;

    /* render each reward in the main page */
    projectData.rewards.forEach(reward => {
        let rewardElement = '';

        /* if pledge withour reward, dont render, if reward with 0 quantity render with inactive class, else render normally */
        if (reward.minimunPledge === 1) {
            return
        }else if (reward.quantityLeft <= 0) {
            rewardElement = `
            <article class="reward --unavailable" tabindex="0">
                    <div class="reward__row-1">
                        <h3 class="reward__title">${reward.title}
                        </h3>
                        <p class="reward__pledge">Pledge $${reward.minimunPledge} or more
                        </p>
                    </div>
                    <p class="reward__description">${reward.description}</p>
    
                    <div class="reward__row-2">
                        <div class="reward__row-3">
                            <p class="reward__number">${reward.quantityLeft}</p>
                            <p class="reward__text">left</p>
                        </div>
                        <button class="reward__button" data-open-modal="true">Out of Stock</button>
                    </div>
                </article>`;
        } else {
        rewardElement = `
        <article class="reward" tabindex="0">
                <div class="reward__row-1">
                    <h3 class="reward__title">${reward.title}
                    </h3>
                    <p class="reward__pledge">Pledge $${reward.minimunPledge} or more
                    </p>
                </div>
                <p class="reward__description">${reward.description}</p>

                <div class="reward__row-2">
                    <div class="reward__row-3">
                        <p class="reward__number">${reward.quantityLeft}</p>
                        <p class="reward__text">left</p>
                    </div>
                    <button class="reward__button" data-open-modal="true">Select Reward</button>
                </div>
            </article>`;
        }
        aboutSection.innerHTML += rewardElement;
    
    });
    /* render the rewards for the modal */
    projectData.rewards.forEach(reward => {
        
        /* create unique ids for each reward and its elements*/
        const checkboxId = reward.title.replace(/\s+/g, '') + 'Check';
        const inputId = reward.title.replace(/\s+/g, '') + 'Input';
        const cardId = reward.title.replace(/\s+/g, '') + 'Card';
        let rewardElement = '';
        /* if pledge without reward, dont render some elements, if reward with quantity 0 render with inactive class else render normally */
        if (reward.minimunPledge === 1) {
            rewardElement = `
        <article class="select-reward" id="${cardId}" data-selected="false" tabindex="0">
                <div class="select-reward__checkbox-container">
                    <input  class="select-reward__checkbox" type="radio" name="reward" id="${checkboxId}">
                </div>
                <div class="select-reward__text-wrapper">
                    <label  class="select-reward__label" for="${checkboxId}">
                        <p class="select-reward__title">${reward.title}</p>
                    </label>
                </div>
                <div class="select-reward__desc-wrapper">
                    <p class="select-reward__description">${reward.description}</p>
                </div>
                <div class="select-reward__quantity-container">
                </div>
                <div class="select-reward__selected-menu">
                    <div class="select-reward__selected-flex-container">
                        <label class="select-reward__selected-label" for="${inputId}">
                            <p class="select-reward__selected-text">Enter your pledge</p>
                        </label>
                        <form class="select-reward__selected-row">
                            <input required class="select-reward__selected-input" type="number" id="${inputId}" max="9999" min="1">
                            <button type="submit" class="select-reward__selected-button" data-opensuccess="true">Continue</button>
                        </form>
                    </div>
                </div>
            </article>
        `;
        }
        else if (reward.quantityLeft <= 0) {
            rewardElement = `
        <article class="select-reward --unavailable" id="${cardId}"  tabindex="0">
                <div class="select-reward__checkbox-container">
                    <input  class="select-reward__checkbox" type="radio" name="reward" id="${checkboxId}">
                </div>
                <div class="select-reward__text-wrapper">
                    <label  class="select-reward__label" for="${checkboxId}">
                        <p class="select-reward__title">${reward.title}</p>
                    </label>
                    <p class="select-reward__pledge">Pledge $${reward.minimunPledge} or more</p>
                </div>
                <div class="select-reward__desc-wrapper">
                    <p class="select-reward__description">${reward.description}</p>
                </div>
                <div class="select-reward__quantity-container">
                    <p class="select-reward__number">${reward.quantityLeft}</p>
                    <p class="select-reward__text">left</p>
                </div>
                <div class="select-reward__selected-menu">
                    <div class="select-reward__selected-flex-container">
                        <label class="select-reward__selected-label" for="${inputId}">
                            <p class="select-reward__selected-text">Enter your pledge</p>
                        </label>
                        <form class="select-reward__selected-row">
                            <input required class="select-reward__selected-input" type="number" id="${inputId}" max="9999" min="${reward.minimunPledge}">
                            <button type="submit" class="select-reward__selected-button" data-opensuccess="true">Continue</button>
                        </form>
                    </div>
                </div>
            </article>
        `;
        } else {
            rewardElement = `
        <article class="select-reward" id="${cardId}" data-selected="false" tabindex="0">
                <div class="select-reward__checkbox-container">
                    <input  class="select-reward__checkbox" type="radio" name="reward" id="${checkboxId}">
                </div>
                <div class="select-reward__text-wrapper">
                    <label  class="select-reward__label" for="${checkboxId}">
                        <p class="select-reward__title">${reward.title}</p>
                    </label>
                    <p class="select-reward__pledge">Pledge $${reward.minimunPledge} or more</p>
                </div>
                <div class="select-reward__desc-wrapper">
                    <p class="select-reward__description">${reward.description}</p>
                </div>
                <div class="select-reward__quantity-container">
                    <p class="select-reward__number">${reward.quantityLeft}</p>
                    <p class="select-reward__text">left</p>
                </div>
                <div class="select-reward__selected-menu">
                    <div class="select-reward__selected-flex-container">
                        <label class="select-reward__selected-label" for="${inputId}">
                            <p class="select-reward__selected-text">Enter your pledge</p>
                        </label>
                        <form class="select-reward__selected-row">
                            <input required class="select-reward__selected-input" type="number" id="${inputId}" max="9999" min="${reward.minimunPledge}">
                            <button type="submit" class="select-reward__selected-button" data-opensuccess="true">Continue</button>
                        </form>
                    </div>
                </div>
            </article>
        `;
        }
        
        
        modalRewardsContainer.innerHTML += rewardElement;
    })

}

/*call the render function */
rederProject(projectData);

/* get an array of buttons in the main page which will open the modal, get the modal, the modal background and the close button */
const buttons = document.querySelectorAll('[data-open-modal="true"]');
const selectModal = document.querySelector('#select-modal') as HTMLElement;
const selectModalBackground = document.querySelector('#select-modal-background') as HTMLSpanElement;
const closeButton = document.querySelector('#close-select-modal') as HTMLButtonElement;

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
const modalRewardCards = document.querySelectorAll('[data-selected]');

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


    /* get the bookmark button */
    const bookmarkButton = document.querySelector('#bookmark-button') as HTMLButtonElement;

    /* add the event to the button, to change the data-attribute and also modify the data inside the object */
    bookmarkButton.addEventListener('click', () => {
        if (projectData.isBookmarked) {
            projectData.bookmark = false;
            bookmarkButton.dataset.bookmarked = 'false';
            return
        }
        if (!projectData.isBookmarked) {
            projectData.bookmark = true;
            bookmarkButton.dataset.bookmarked = 'true'
            return
        }
    })

/* i will have to erase this events, becuse the succes modal should not open on click but on "submit", */ 

const openSuccessButtons = document.querySelectorAll('[data-opensuccess="true"]');

const successModal = document.querySelector('#sucm') as HTMLElement ;
const successBackground = document.querySelector('#sucb') as HTMLSpanElement;
const buttonSuccess = document.querySelector('#button-success') as HTMLButtonElement;


openSuccessButtons.forEach(button => {
    button.addEventListener('click', (event)=> {
        alert('button click')
        event.stopPropagation()
        /*
        selectModal.dataset.open = "false";
        selectModalBackground.dataset.open = "false";
        successBackground.dataset.modalsuccess = "true"
        successModal.dataset.modalsuccess = "true";
        successModal.focus();
        */
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
    })

    buttonSuccess.addEventListener('click', ()=> {
        successModal.dataset.modalsuccess = "false";
        successBackground.dataset.modalsuccess = "false";
        rederProject(projectData)
    })




    /* get the forms inside the reward cards of the select modal */
    const forms = document.querySelectorAll('.select-reward__selected-row');

    /* prevent the submission of the form*/
    forms.forEach( form => {
        form.addEventListener('submit', (e)=> {
            alert('submit');
            //stop the form from submitting
            e.preventDefault();
            //get the input inside the form
            const inputNumber = form.querySelector('input') as HTMLInputElement;
            alert(inputNumber.value);
            alert(inputNumber.min)
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

    /* a function that updates the width of the progreess bar in relation to the current amount backed in the project */
    function percentangeCalc (projectData){

        const percentange = ((projectData.backed.currentAmount * 100) / projectData.backed.objective);

        const progressProgress = document.querySelector('#progress-progress') as HTMLDivElement;

        progressProgress.style.width = `${percentange}%`
    }

    percentangeCalc(projectData);

