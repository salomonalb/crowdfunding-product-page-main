import { projectData } from "./project-data";

export function bookmark() {
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
}