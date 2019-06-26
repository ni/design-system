export class PagerPage {
    getRoot () {
        return document.querySelector('mc-pager').shadowRoot;
    }

    getPagerCount () {
        return document.querySelectorAll('mc-pager').length;
    }

    getPager () {
        return this.getRoot().querySelector('.mc-pager-main');
    }

    getGoToPageInput () {
        return this.getRoot().querySelector('.mc-pager-go-to-page');
    }

    getPageSizeSelect () {
        return this.getRoot().querySelector('.mc-pager-page-size');
    }

    getPageSizeOptions () {
        return this.getPageSizeSelect().querySelectorAll('option');
    }

    getItemText () {
        return this.getRoot().querySelector('.mc-pager-item-text');
    }

    clickPrevious () {
        this.getRoot().querySelector('.mc-pager-button-previous').click();
    }

    clickNext () {
        this.getRoot().querySelector('.mc-pager-button-next').click();
    }
}
