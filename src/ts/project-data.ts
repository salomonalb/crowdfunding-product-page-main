export const projectData = {
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
            this.currentAmount += amount;
        },
        increaseTotalBackers() {
            this.totalBackers++
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
                this.quantityLeft -= 1;
            }
        },
        {
            "title": "Bamboo Stand",
            "description": "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.",
            "quantityLeft": 101,
            "minimunPledge": 25,
            decreaseQuantity() {
                this.quantityLeft -= 1;
            }
        },
        {
            "title": "Black Edition Stand",
            "description": "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            "quantityLeft": 64,
            "minimunPledge": 75,
            decreaseQuantity() {
                this.quantityLeft -= 1;
            }
        },
        {
            "title": "Mahogany Special Edition",
            "description": "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            "quantityLeft": 0,
            "minimunPledge": 200,
            decreaseQuantity() {
                this.quantityLeft -= 1;
            }
        }
    ]
}