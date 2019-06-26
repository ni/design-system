export class PolicyEditorPage {
    getRoot () {
        return document.querySelector('mc-policy-editor').shadowRoot;
    }

    getTitle () {
        return this.getRoot().querySelector('#policytitle');
    }

    getPolicyNameInput () {
        return this.getRoot().querySelector('#policyNameInput');
    }

    getTagPathFilterInput () {
        return this.getRoot().querySelector('#tagWildCardInput');
    }

    getMessageTopicFilterInput () {
        return this.getRoot().querySelector('#topicWildCardInput');
    }

    getMessageSection () {
        return this.getRoot().querySelector('#mpsstatementtitle');
    }

    getTagSection () {
        return this.getRoot().querySelector('#statementtitle');
    }

    setEditBoxValue (editBox, newValue) {
        editBox.value = newValue;
        let inputEvent = new CustomEvent('input');
        editBox.dispatchEvent(inputEvent);
    }

    getReadTagCheckBox () {
        return this.getRoot().querySelector('#readCheck');
    }

    getWriteTagCheckBox () {
        return this.getRoot().querySelector('#writeCheck');
    }

    getModifyTagCheckBox () {
        return this.getRoot().querySelector('#modifyCheck');
    }

    getDeleteTagCheckBox () {
        return this.getRoot().querySelector('#deleteCheck');
    }

    getCreateTagCheckBox () {
        return this.getRoot().querySelector('#createCheck');
    }

    getSubscribeToTopicCheckBox () {
        return this.getRoot().querySelector('#subscribeCheck');
    }

    getPublishToTopicCheckBox () {
        return this.getRoot().querySelector('#publishCheck');
    }

    clickCheckBox (checkBox) {
        checkBox.checked = !checkBox.checked;
        let changeEvent = new CustomEvent('change');
        checkBox.dispatchEvent(changeEvent);
    }

    getUpdateButton () {
        return this.getRoot().querySelector('#update');
    }

    getCancelButton () {
        return this.getRoot().querySelector('#cancel');
    }

    getDeleteButton () {
        return this.getRoot().querySelector('#delete');
    }

    clickButton (button) {
        let changeEvent = new CustomEvent('click');
        button.dispatchEvent(changeEvent);
    }

    getNotificationContainer () {
        return this.getRoot().querySelector('#policy-validation-notification-container');
    }
}
