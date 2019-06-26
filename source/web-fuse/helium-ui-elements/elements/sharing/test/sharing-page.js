export class SharingPage {
    getRoot () {
        return document.querySelector('mc-sharing').shadowRoot;
    }

    getSharing () {
        return this.getRoot().querySelector('.mc-sharing-main');
    }

    getTitle () {
        return this.getRoot().querySelector('#mc-sharing-title').innerText;
    }

    getEmailInput () {
        return this.getRoot().querySelector('#mc-sharing-email-input');
    }

    getSelectedEmailsContainer () {
        return this.getRoot().querySelector('#mc-sharing-selected-emails');
    }

    getSelectedEmails () {
        return this.getRoot().querySelectorAll('.mc-sharing-selected-email');
    }

    getSelectedEmailInitial (chip) {
        return chip.querySelector('.mc-sharing-selected-email-chip');
    }

    getSelectedEmailText (chip) {
        return chip.querySelector('.mc-sharing-selected-email-text');
    }

    getSelectedEmailCloseButton (chip) {
        return chip.querySelector('.mc-sharing-selected-email-remove');
    }

    clickRemoveChipButton (chip) {
        let button = this.getSelectedEmailCloseButton(chip);
        let clickEvent = new CustomEvent('click');
        button.dispatchEvent(clickEvent);
    }

    clickAddMessageButton () {
        let button = this.getUserMessageButton();
        let clickEvent = new CustomEvent('click');
        button.dispatchEvent(clickEvent);
    }

    clickReviewPolicyButton () {
        let button = this.getShowPolicyButton();
        let clickEvent = new CustomEvent('click');
        button.dispatchEvent(clickEvent);
    }

    getUserMessageButton () {
        return this.getRoot().querySelector('#mc-sharing-message-button');
    }

    getShowPolicyButton () {
        return this.getRoot().querySelector('#mc-sharing-review-policy');
    }

    getUserMessage () {
        return this.getRoot().querySelector('#mc-sharing-text-message');
    }

    setMessage (newValue) {
        let editBox = this.getUserMessage();
        editBox.value = newValue;
        let inputEvent = new CustomEvent('input');
        let changed = new CustomEvent('change');
        editBox.dispatchEvent(inputEvent);
        editBox.dispatchEvent(changed);
    }
}
