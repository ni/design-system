import '../policy-editor.js';

import { createFixture, pressKey } from '../../test/test-utils.js';
import { PolicyEditorPage } from './policy-editor-page.js';

const POLICY_EDITOR_I18N = {
    header: 'Policy settings',
    tags: {
        header: 'Tag service',
        permissions: 'Permissions',
        read: 'Read',
        write: 'Write',
        modify: 'Modify',
        delete: 'Delete',
        create: 'Create',
        path: 'Tag path',
        pathDescription: 'Set tag permissions based on tag path',
        wildcardPlaceholder: 'Wildcard path...',
        helpLink: 'Learn more about using wildcard syntax.'
    },
    messages: {
        header: 'Message service',
        permissions: 'Permissions',
        subscribe: 'Subscribe',
        publish: 'Publish',
        topic: 'Message Topic',
        topicDescription: 'Set permissions to specific topic or topics',
        wildcardPlaceholder: 'Wildcard path...',
        helpLink: 'Learn more about using wildcard syntax.'
    },
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    cancel: 'Cancel'
};

describe('PolicyEditor ', () => {
    describe('for new ', () => {
        beforeEach(function () {
            this.page = new PolicyEditorPage();
            this.element = createFixture(`<mc-policy-editor for-new="true" disable-delete="true"></mc-policy-editor>`,
                (element) => {
                    element.i18n = POLICY_EDITOR_I18N;
                    element.policy = {
                        name: 'my-policy-name',
                        tagPathFilter: 'my-tag-path',
                        messageTopicFilter: 'my-message-topic',
                        tagActions: ['read', 'write'],
                        messageActions: ['publish']
                    };
                });
        });

        it('should have Create button', function () {
            let button = this.page.getUpdateButton();
            expect(button.innerHTML).toBe('Create');
        });

        it('should have Delete button hidden', function () {
            let button = this.page.getDeleteButton();
            expect(button.classList.value.includes('mc-slide-menu-hidden')).toBe(true);
        });
    });

    describe('for webapp ', () => {
        beforeEach(function () {
            this.page = new PolicyEditorPage();
            this.element = createFixture(`<mc-policy-editor disable-delete="true" disable-name-edit="true"></mc-policy-editor>`,
                (element) => {
                    element.i18n = POLICY_EDITOR_I18N;
                    element.policy = {
                        name: 'my-policy-name',
                        tagPathFilter: 'my-tag-path',
                        messageTopicFilter: 'my-message-topic',
                        tagActions: ['read', 'write'],
                        messageActions: ['publish']
                    };
                });
        });

        it('should have Delete button hidden', function () {
            let button = this.page.getDeleteButton();
            expect(button.classList.value.includes('mc-slide-menu-hidden')).toBe(true);
        });

        it('cannot edit policy name', function () {
            let input = this.page.getPolicyNameInput();
            expect(input.hasAttribute('readonly')).toBe(true);
        });
    });

    describe('', () => {
        beforeEach(function () {
            this.page = new PolicyEditorPage();
            this.element = createFixture(`<mc-policy-editor disable-name-edit="false"></mc-policy-editor>`,
                (element) => {
                    element.i18n = POLICY_EDITOR_I18N;
                    element.policy = {
                        name: 'my-policy-name',
                        tagPathFilter: 'my-tag-path',
                        messageTopicFilter: 'my-message-topic',
                        tagActions: ['read', 'write'],
                        messageActions: ['publish']
                    };
                });
        });

        it('can edit policy name', function () {
            let input = this.page.getPolicyNameInput();
            expect(input.hasAttribute('readonly')).toBe(false);
        });

        it('should display title', function () {
            let title = this.page.getTitle();

            expect(title.textContent).toBe('Policy settings');
        });

        it('should show tag section', function () {
            let tagSection = this.page.getTagSection();

            expect(tagSection.textContent).toBe('Tag service');
        });

        it('should show message section', function () {
            let messageSection = this.page.getMessageSection();

            expect(messageSection.textContent).toBe('Message service');
        });

        it('should display policy name', function () {
            let policyName = this.page.getPolicyNameInput();

            expect(policyName.value).toBe('my-policy-name');
        });

        it('should display tag path filter', function () {
            let tagPath = this.page.getTagPathFilterInput();

            expect(tagPath.value).toBe('my-tag-path');
        });

        it('should display message topic filter', function () {
            let messageTopic = this.page.getMessageTopicFilterInput();

            expect(messageTopic.value).toBe('my-message-topic');
        });

        it('should trigger name change envent with new name when editing the name input', async function () {
            let policyName = this.page.getPolicyNameInput();

            let newName;
            this.element.addEventListener('policyNameChange', (evt) => {
                newName = evt.detail.name;
            });

            this.page.setEditBoxValue(policyName, 'new-name');
            expect(newName).toBe('new-name');
        });

        it('should trigger tag path change event with new tagPathFilter when editing the tag path wildcard input input', async function () {
            let tagPathFilter = this.page.getTagPathFilterInput();

            let newValue;
            this.element.addEventListener('tagPathFilterChange', (evt) => {
                newValue = evt.detail.tagPathFilter;
            });

            this.page.setEditBoxValue(tagPathFilter, 'new-tag');
            expect(newValue).toBe('new-tag');
        });

        it('should trigger message topic change event with new messageTopicFilter when editing the topic wildcard input', async function () {
            let filter = this.page.getMessageTopicFilterInput();

            let newValue;
            this.element.addEventListener('messageTopicFilterChange', (evt) => {
                newValue = evt.detail.messageTopicFilter;
            });

            this.page.setEditBoxValue(filter, 'new-message');
            expect(newValue).toBe('new-message');
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the readCheck check box ', async function () {
            let readTag = this.page.getReadTagCheckBox();
            let expectedValue = !readTag.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(readTag);
            expect(type).toBe('tag');
            expect(action).toBe('read');
            expect(value).toBe(expectedValue);
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the WriteCheck check box ', async function () {
            let writeTag = this.page.getWriteTagCheckBox();
            let expectedValue = !writeTag.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(writeTag);
            expect(type).toBe('tag');
            expect(action).toBe('write');
            expect(value).toBe(expectedValue);
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the deleteCheck check box ', async function () {
            let checkBox = this.page.getDeleteTagCheckBox();
            let expectedValue = !checkBox.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(checkBox);
            expect(type).toBe('tag');
            expect(action).toBe('delete');
            expect(value).toBe(expectedValue);
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the createCheck check box ', async function () {
            let checkBox = this.page.getCreateTagCheckBox();
            let expectedValue = !checkBox.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(checkBox);
            expect(type).toBe('tag');
            expect(action).toBe('create');
            expect(value).toBe(expectedValue);
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the modifyCheck check box ', async function () {
            let checkBox = this.page.getModifyTagCheckBox();
            let expectedValue = !checkBox.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(checkBox);
            expect(type).toBe('tag');
            expect(action).toBe('modify');
            expect(value).toBe(expectedValue);
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the publish message check box ', async function () {
            let checkBox = this.page.getPublishToTopicCheckBox();
            let expectedValue = !checkBox.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(checkBox);
            expect(type).toBe('message');
            expect(action).toBe('publish');
            expect(value).toBe(expectedValue);
        });

        it('should trigger the permissionChanged event with the propper details when clicking on the subscribe message check box ', async function () {
            let checkBox = this.page.getSubscribeToTopicCheckBox();
            let expectedValue = !checkBox.checked;

            let type;
            let action;
            let value;
            this.element.addEventListener('permissionChanged', (evt) => {
                type = evt.detail.type;
                action = evt.detail.action;
                value = evt.detail.value;
            });

            this.page.clickCheckBox(checkBox);
            expect(type).toBe('message');
            expect(action).toBe('subscribe');
            expect(value).toBe(expectedValue);
        });

        it('should trigger an update event when clicking Update button ', async function () {
            let button = this.page.getUpdateButton();

            let triggered = false;
            this.element.addEventListener('update', (evt) => {
                triggered = true;
            });

            this.page.clickButton(button);
            expect(triggered).toBe(true);
        });

        it('should trigger a delete event when clicking Delete button ', async function () {
            let button = this.page.getDeleteButton();

            let triggered = false;
            this.element.addEventListener('delete', (evt) => {
                triggered = true;
            });

            this.page.clickButton(button);
            expect(triggered).toBe(true);
        });

        it('should trigger a cancel event when clicking Cancel button', async function () {
            let button = this.page.getCancelButton();

            let triggered = false;
            this.element.addEventListener('cancel', (evt) => {
                triggered = true;
            });

            this.page.clickButton(button);
            expect(triggered).toBe(true);
        });

        it('should trigger update event when pressing Enter', async function () {
            let triggered = false;
            this.element.addEventListener('update', (evt) => {
                triggered = true;
            });
            pressKey(document, 'Enter');
            expect(triggered).toBe(true);
        });

        it('should trigger cancel event when pressing Escape', async function () {
            let triggered = false;
            this.element.addEventListener('cancel', (evt) => {
                triggered = true;
            });
            pressKey(document, 'Escape');
            expect(triggered).toBe(true);
        });
    });

    describe('in error state ', () => {
        beforeEach(function () {
            this.page = new PolicyEditorPage();
            this.element = createFixture(`<mc-policy-editor></mc-policy-editor>`,
                (element) => {
                    element.i18n = POLICY_EDITOR_I18N;
                    element.policy = {
                        name: 'my-policy-name',
                        tagPathFilter: 'my-tag-path',
                        messageTopicFilter: 'my-message-topic',
                        tagActions: ['read', 'write'],
                        messageActions: ['publish']
                    };
                });

            this.element.handleError('Awesome Error !!!!');
        });

        it('should display error message', function () {
            let notificationContainer = this.page.getNotificationContainer();
            let errorMessage = notificationContainer.querySelector('#policy-validation');
            expect(errorMessage.textContent).toBe('Awesome Error !!!!');
            expect(errorMessage.classList.value).toBe('mc-policy-editor-error-message');
        });

        it('should disable Update button', function () {
            let button = this.page.getUpdateButton();
            expect(button.disabled).toBe(true);
        });

        it('should underline input with red', function () {
            let button = this.page.getPolicyNameInput();
            expect(button.classList.value).toBe('mc-input mc-policy-editor-name-input error');
        });
    });
});
