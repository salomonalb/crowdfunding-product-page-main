# Crowdfunding Product Page

This project allows you to select a reward for supporting a project, make pledges and input the amount to be billed. 

As you make pledges, the page keeps track of the changes of the total amount backed, the number of backers, the bookmarked state, and the quantity of rewards left.

It's made with HTML, SCSS and Typescript.

The basic structure was made in HTML

Typescript then updates this structure with the corresponding data, renders the rewards, handle the events and validates the input.

The data of the product is in an object.

When a pledge is made this object is updated and the function that updates the UI is called again.

The build tool used to compile Typescript and SCSS files is [Parcel](https://parceljs.org/)

This project is based on the [challenge from Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR)

This repository was created using the Github CLI.

This project is deployed with Netlify.

https://crowndfunding-productpage.netlify.app/

