export function rederProject(projectData) {

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

    const bookmarkButton = document.querySelector('#bookmark-button') as HTMLButtonElement;

    if (projectData.isBookmarked) {
        bookmarkButton.dataset.bookmarked = 'true';
    } 
    if (!projectData.isBookmarked) {
        bookmarkButton.dataset.bookmarked = 'false'
    }
    /* render each reward in the main page */
    aboutSection.innerHTML = '';
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

    modalRewardsContainer.innerHTML = '';
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

    function percentangeCalc (projectData){

        const percentange = ((projectData.backed.currentAmount * 100) / projectData.backed.objective);

        const progressProgress = document.querySelector('#progress-progress') as HTMLDivElement;

        progressProgress.style.width = `${percentange}%`
    }

    percentangeCalc(projectData);
}