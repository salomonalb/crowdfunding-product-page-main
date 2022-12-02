/*

To do

make the card 'clickable' with the keyboards

make clicking on the inputs of the card while selected not close the card
make a card with quantity zero have a class to look inactive

set the length of the bar depending on the percentange
give tab index to reward cards to make them focusable


validate the input numbers,
add the amount to the object
if the amount is above the minimun pledge, accept
reduce the quantity left by one,
update the current amount and the lenght of the bar

make clicking a specific reward focus that reward on the modal
trap focus, trap scrolling. make modals appear in the center of the screen;




*/







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
        "currentAmount": 89914,
        "totalBackers": 5007,
        "objective": 100000
    },
    "daysLeft": 56,
    "rewards": [
        {
            "title": "Bamboo Stand",
            "description": "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.",
            "quantityLeft": 101,
            "minimunPledge": 25
        },
        {
            "title": "Black Edition Stand",
            "description": "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            "quantityLeft": 64,
            "minimunPledge": 75
        },
        {
            "title": "Mahogany Special Edition",
            "description": "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            "quantityLeft": 0,
            "minimunPledge": 200
        }
    ]
}

function rederProject(projectData) {

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

    titleElement.textContent = projectData.title;
    shortDescriptionElement.textContent = projectData.shortDescription;
    currentAmountElement.textContent =`$${projectData.backed.currentAmount}`;
    objectiveElement.textContent = `of $${projectData.backed.objective} backed`;
    totalBackersElement.textContent = `${projectData.backed.totalBackers}`;
    daysLeftElement.textContent = `${projectData.daysLeft}`;
    longDescriptionElement1.textContent = projectData.longDescription.p1;
    longDescriptionElement2.textContent = projectData.longDescription.p2;

    projectData.rewards.forEach(reward => {
        const rewardElement = `
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

        aboutSection.innerHTML += rewardElement;
    });

    projectData.rewards.forEach(reward => {
        const checkboxId = reward.title.replace(/\s+/g, '') + 'Check';
        const inputId = reward.title.replace(/\s+/g, '') + 'Input';
        const cardId = reward.title.replace(/\s+/g, '') + 'Card';
        const rewardElement = `
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
                        <div class="select-reward__selected-row">
                            <input maxlength="4" class="select-reward__selected-input" type="text" id="${inputId}">
                            <button class="select-reward__selected-button" data-opensuccess="true">Continue</button>
                        </div>
                    </div>
                </div>
            </article>
        `;
        
        modalRewardsContainer.innerHTML += rewardElement;
        /*
        let checkbox = document.querySelector(`#${checkboxId}`) as HTMLInputElement;
        let card = document.querySelector(`#${cardId}`) as HTMLElement;
        alert(`here ${card}`);
        card.addEventListener('click', ()=> {
            alert(cardId)
            if (!checkbox.checked) {
                checkbox.checked = true;
                card.dataset.selected = "true";   
            } else if (checkbox.checked) {
                checkbox.checked = false;
                card.dataset.selected = "false";
            }
            
            /* only the last card is working, it seems like the for each loop overwrites the event and only adds it to the last card 
        })
        */
        
    })

}

rederProject(projectData);

const buttons = document.querySelectorAll('[data-open-modal="true"]');
const selectModal = document.querySelector('#select-modal') as HTMLElement;
const selectModalBackground = document.querySelector('#select-modal-background') as HTMLSpanElement;
const closeButton = document.querySelector('#close-select-modal') as HTMLButtonElement;
buttons.forEach(button => {
    button.addEventListener('click', ()=> {
        selectModal.dataset.open = "true";
        selectModalBackground.dataset.open = "true";
        let element = selectModal.firstElementChild as HTMLElement;
        element.tabIndex = 0;
        element.focus()
    })
})

selectModalBackground.addEventListener('click', ()=> {
    selectModal.dataset.open = "false";
    selectModalBackground.dataset.open = "false";
})

closeButton.addEventListener('click', ()=> {
    selectModal.dataset.open = "false";
    selectModalBackground.dataset.open = "false";
})


const modalRewardCards = document.querySelectorAll('[data-selected]');

modalRewardCards.forEach((element, index, cardsArray) => {

    const rewardCard = element as HTMLElement;
    const checkbox  = rewardCard.querySelector('.select-reward__checkbox') as HTMLInputElement;
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
    checkbox.addEventListener('click', ()=> {
        if (!checkbox.checked) {
            checkbox.checked = true;
            rewardCard.dataset.selected = "true";   
        } else if (checkbox.checked) {
            checkbox.checked = false;
            rewardCard.dataset.selected = "false";
        }
    })
})

const openSuccessButtons = document.querySelectorAll('[data-opensuccess="true"]');

const successModal = document.querySelector('#sucm') as HTMLElement ;
const successBackground = document.querySelector('#sucb') as HTMLSpanElement;
const buttonSuccess = document.querySelector('#button-success') as HTMLButtonElement;


openSuccessButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        selectModal.dataset.open = "false";
        selectModalBackground.dataset.open = "false";
        successBackground.dataset.modalsuccess = "true"
        successModal.dataset.modalsuccess = "true";
        successModal.focus();
    })
    })

    successBackground.addEventListener('click', ()=> {
        successModal.dataset.modalsuccess = "false";
        successBackground.dataset.modalsuccess = "false";
    })

    buttonSuccess.addEventListener('click', ()=> {
        successModal.dataset.modalsuccess = "false";
        successBackground.dataset.modalsuccess = "false";
    })


    const bookmarkButton = document.querySelector('#bookmark-button') as HTMLButtonElement;

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
