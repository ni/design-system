import '../sharing.js';

import { createFixture, isVisible, pressKey } from '../../test/test-utils.js';
import { SharingPage } from './sharing-page.js';
import { AutocompletePage } from '../../autocomplete/test/autocomplete-page.js';

describe('Sharing', () => {
    beforeEach(function () {
        this.element = createFixture(
            `<mc-sharing
                everyone="Everyone"
                header="Awesome App that does not really do much.nipkg"
                email-placeholder="Enter an email or 'Everyone'"
                message-add-text="Add message"
                message-remove-text="Remove custom message"
                message-placeholder="Enter your custom message here."
                error-message-invalid-email="Provide valid email or 'Everyone'"
                error-message-already-public="Already public"
                error-message-already-used="This email is already used">
            </mc-sharing>`);
        this.page = new SharingPage();
        this.autocompletePage = new AutocompletePage(this.page.getSharing());
    });

    describe('Initial state', () => {
        beforeEach(function () {
            this.element.emailHints = ['aaa@aaa.com', 'bbb@bbb.com', 'ccc@ccc.com', 'ddd@ddd.com', 'fff@fff.com', 'xxxx@xxx.com'];
        });

        it('should show sharing', function () {
            let sharing = this.page.getSharing();
            expect(isVisible(sharing)).toBeTruthy();
        });

        it('should display title', function () {
            let title = this.page.getTitle();
            expect(title).toBe('Awesome App that does not really do much.nipkg');
        });

        it('should display selected emails', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'bbb@bbb.com', 'ccc@ccc.com', 'ddd@ddd.com', 'fff@fff.com', 'xxxx@xxx.com', 'Everyone'];
            let emails = this.page.getSelectedEmails();
            expect(emails.length).toBe(7);
        });

        it('should scroll selected emails to bottom', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'bbb@bbb.com', 'ccc@ccc.com', 'ddd@ddd.com', 'fff@fff.com', 'xxxx@xxx.com', 'Everyone'];
            let container = this.page.getSelectedEmailsContainer();
            expect(container.scrollTop <= (container.scrollHeight - container.offsetHeight)).toBeTruthy();
        });

        it('should display selected emails and everyone', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'Everyone'];
            let emails = this.page.getSelectedEmails();
            expect(emails.length).toBe(2);
        });

        it('should display email chip propperly', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'Everyone'];
            let emails = this.page.getSelectedEmails();
            let chip = emails.item(0);

            let initial = this.page.getSelectedEmailInitial(chip);
            let text = this.page.getSelectedEmailText(chip);
            let button = this.page.getSelectedEmailCloseButton(chip);
            expect(initial.innerText).toBe('a');
            expect(text.innerText).toBe('aaa@bbb.com');
            expect(button).toBeTruthy();
        });

        it('should not display Add message button', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'Everyone'];
            let button = this.page.getUserMessageButton();
            expect(isVisible(button)).toBeFalsy();
        });

        it('should not display message text area', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'Everyone'];
            let message = this.page.getUserMessage();
            expect(message.classList.value).toBe('mc-sharing-text-message hidden');
        });

        it('should remove email chip if clicking on X button', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'Everyone'];

            let emails = this.page.getSelectedEmails();
            let chip = emails.item(0);
            this.page.clickRemoveChipButton(chip);

            emails = this.page.getSelectedEmails();
            chip = emails.item(0);
            let initial = this.page.getSelectedEmailInitial(chip);
            let text = this.page.getSelectedEmailText(chip);
            expect(emails.length).toBe(1);
            expect(initial.innerText).toBe('E');
            expect(text.innerText).toBe('Everyone');
        });

        it('should trigger email-added event', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'Everyone'];

            let remoevedEmail;
            this.element.addEventListener('email-removed', (evt) => {
                remoevedEmail = evt.detail.email;
            });

            let emails = this.page.getSelectedEmails();
            let chip = emails.item(0);
            this.page.clickRemoveChipButton(chip);

            expect(remoevedEmail).toBe('aaa@bbb.com');
        });
    });

    describe('Adding an email', () => {
        it('should add an email chip when typing and hitting enter', function () {
            this.autocompletePage.setInputValue('cc@cc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');

            let emails = this.page.getSelectedEmails();
            expect(emails.length).toBe(1);

            let chip = emails[0];

            let initial = this.page.getSelectedEmailInitial(chip);
            let text = this.page.getSelectedEmailText(chip);
            let button = this.page.getSelectedEmailCloseButton(chip);

            expect(initial.innerText).toBe('c');
            expect(text.innerText).toBe('cc@cc.com');
            expect(button).toBeTruthy();
        });

        it('should clear email input and hitting enter', function () {
            this.autocompletePage.setInputValue('cc@cc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');

            this.autocompletePage.getInput().value = '';
        });

        it('should trigger email-added event', function () {
            this.autocompletePage.setInputValue('cc@cc.com');
            let email;
            this.element.addEventListener('email-added', (evt) => {
                email = evt.detail.email;
            });

            pressKey(this.autocompletePage.getInput(), 'Enter');
            expect(email).toBe('cc@cc.com');
        });

        it('should display Add message button', function () {
            this.autocompletePage.setInputValue('cc@cc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');
            let button = this.page.getUserMessageButton();
            expect(isVisible(button)).toBeTruthy();
        });

        it('should not add the same email', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'bbb@bbb.com'];
            this.autocompletePage.setInputValue('aaa@bbb.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');

            let emails = this.page.getSelectedEmails();
            expect(emails.length).toBe(2);

            expect(this.page.getEmailInput().getAttribute('error-message')).toBe('This email is already used');
        });

        it('should not add Everyone twice', function () {
            this.element.selectedEmails = ['Everyone', 'bbb@bbb.com'];
            this.autocompletePage.setInputValue('Everyone');
            pressKey(this.autocompletePage.getInput(), 'Enter');

            let emails = this.page.getSelectedEmails();
            expect(emails.length).toBe(2);

            expect(this.page.getEmailInput().getAttribute('error-message')).toBe('Already public');
        });

        it('should not add an invalid email and not clear input', function () {
            this.autocompletePage.setInputValue('cccc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');

            let emails = this.page.getSelectedEmails();
            expect(emails.length).toBe(0);

            expect(this.autocompletePage.getInput().value).toBe('cccc.com');
            expect(this.page.getEmailInput().getAttribute('error-message')).toBe(`Provide valid email or 'Everyone'`);
        });

        it('should scroll to bottom', function () {
            this.element.selectedEmails = ['aaa@bbb.com', 'bbb@bbb.com', 'ccc@ccc.com', 'ddd@ddd.com', 'fff@fff.com', 'xxxx@xxx.com', 'Everyone'];
            this.autocompletePage.setInputValue('cc@cc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');
            let container = this.page.getSelectedEmailsContainer();
            expect(container.scrollTop <= (container.scrollHeight - container.offsetHeight)).toBeTruthy();
        });
    });

    describe('Add message button', () => {
        beforeEach(function () {
            this.autocompletePage.setInputValue('cc@cc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');
        });

        it('should show text area', function () {
            this.page.clickAddMessageButton();
            let message = this.page.getUserMessage();
            expect(message.classList.value).toBe('mc-sharing-text-message');
        });
    });

    describe('Custom message area', () => {
        beforeEach(function () {
            this.autocompletePage.setInputValue('cc@cc.com');
            pressKey(this.autocompletePage.getInput(), 'Enter');
            this.page.clickAddMessageButton();
        });

        it('should trigger event when changing message', function () {
            let message;
            this.element.addEventListener('custom-message-changed', (evt) => {
                message = evt.detail.message;
            });
            this.page.setMessage('Custom message');
            expect(message).toBe('Custom message');
        });
    });
});
