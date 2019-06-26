import '../dialog.js';

import { createFixture, isVisible, pressKey } from '../../test/test-utils.js';
import { DialogPage } from './dialog-page.js';

describe('Dialog', () => {
    beforeEach(function () {
        this.page = new DialogPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture('<mc-dialog header="Hello" text-middle-button="OK" text-right-button="CANCEL"></mc-dialog>');
        });

        it('should show dialog in the center', function () {
            let dialog = this.page.getDialog();
            expect(isVisible(dialog)).toBeTruthy();

            let dialogContent = this.page.getDialogContent();
            let dialogDimension = dialogContent.getBoundingClientRect();
            let bodyDimension = document.body.getBoundingClientRect();
            expect(dialogDimension.right < bodyDimension.right).toBeTruthy();
            expect(dialogDimension.left > bodyDimension.left).toBeTruthy();
            expect(dialogDimension.top > bodyDimension.top).toBeTruthy();
            expect(dialogDimension.bottom < bodyDimension.bottom).toBeTruthy();
        });

        it('should show dialog on the right side', function () {
            this.element = createFixture('<mc-dialog header="Hello" position="right"></mc-dialog>');

            let dialog = this.page.getDialog();
            expect(isVisible(dialog)).toBeTruthy();

            let dialogContent = this.page.getDialogContent();
            let dialogDimension = dialogContent.getBoundingClientRect();
            let bodyDimension = document.body.getBoundingClientRect();
            expect(dialogDimension.right === bodyDimension.right).toBeTruthy();
            expect(dialogDimension.left > bodyDimension.left).toBeTruthy();
            expect(dialogDimension.top === 0).toBeTruthy();
            expect(dialogDimension.bottom === bodyDimension.bottom).toBeTruthy();
        });

        it('should enable all buttons by default', function () {
            createFixture('<mc-dialog header="Hello"></mc-dialog>');

            let leftButton = this.page.getLeftButton();
            let middleButton = this.page.getMiddleButton();
            let rightButton = this.page.getRightButton();

            expect(leftButton.hasAttribute('disabled')).toBeFalsy();
            expect(middleButton.hasAttribute('disabled')).toBeFalsy();
            expect(rightButton.hasAttribute('disabled')).toBeFalsy();
        });

        it('should show header', function () {
            let header = this.page.getHeader();

            expect(header.textContent).toBe('Hello');
        });

        it('should NOT show left button', function () {
            let button = this.page.getLeftButton();

            expect(isVisible(button)).toBeFalsy();
        });

        it('should show right button', function () {
            let button = this.page.getRightButton();
            let buttonText = this.page.getRightButtonText();

            expect(isVisible(button)).toBeTruthy();
            expect(buttonText.textContent).toBe('CANCEL');
        });

        it('should show middle button', function () {
            let button = this.page.getMiddleButton();
            let buttonText = this.page.getMiddleButtonText();

            expect(isVisible(button)).toBeTruthy();
            expect(buttonText.textContent).toBe('OK');
        });

        it('should show left button', function () {
            createFixture('<mc-dialog header="Hello" show-left-button="true"></mc-dialog>');

            let button = this.page.getLeftButton();

            expect(isVisible(button)).toBeTruthy();
        });

        it('left button text should be customizable', function () {
            createFixture('<mc-dialog header="Hello" show-left-button="true" text-left-button="COPY"></mc-dialog>');

            let buttonText = this.page.getLeftButtonText();

            expect(buttonText.textContent).toBe('COPY');
        });

        it('cancel text should be customizable', function () {
            createFixture('<mc-dialog header="Hello" text-right-button="Abbrechen"></mc-dialog>');

            let buttonText = this.page.getRightButtonText();

            expect(buttonText.textContent).toBe('Abbrechen');
        });

        it('middle text should be customizable', function () {
            createFixture('<mc-dialog header="Hello" text-middle-button="Close"></mc-dialog>');

            let buttonText = this.page.getMiddleButtonText();

            expect(buttonText.textContent).toBe('Close');
        });

        it('right button should be hidden', function () {
            createFixture('<mc-dialog header="Hello" show-right-button="false"></mc-dialog>');

            let button = this.page.getRightButton();

            expect(isVisible(button)).toBeFalsy();
        });

        it('middle button should be hidden', function () {
            createFixture('<mc-dialog header="Hello" show-middle-button="false"></mc-dialog>');

            let button = this.page.getMiddleButton();

            expect(isVisible(button)).toBeFalsy();
        });

        it('left button should be disabled', function () {
            createFixture('<mc-dialog header="Hello" show-left-button="true" disabled-left-button="true"></mc-dialog>');

            let button = this.page.getLeftButton();

            expect(button.hasAttribute('disabled')).toBeTruthy();
        });

        it('middle button should be disabled', function () {
            createFixture('<mc-dialog header="Hello" disabled-middle-button="true"></mc-dialog>');

            let button = this.page.getMiddleButton();

            expect(button.hasAttribute('disabled')).toBeTruthy();
        });

        it('right button should be disabled', function () {
            createFixture('<mc-dialog header="Hello" disabled-right-button="true"></mc-dialog>');

            let button = this.page.getRightButton();

            expect(button.hasAttribute('disabled')).toBeTruthy();
        });

        it('should fire event on left click', function () {
            let clicked = false;
            this.element.addEventListener('left-button-click', function () {
                clicked = true;
            });

            this.page.clickLeftButton();

            expect(clicked).toBeTruthy();
        });

        it('should fire event on middle click', function () {
            let clicked = false;
            this.element.addEventListener('middle-button-click', function () {
                clicked = true;
            });

            this.page.clickMiddleButton();

            expect(clicked).toBeTruthy();
        });

        it('should fire event on right click', function () {
            let clicked = false;
            this.element.addEventListener('right-button-click', function () {
                clicked = true;
            });

            this.page.clickRightButton();

            expect(clicked).toBeTruthy();
        });

        it('should fire middle click event on enter', function () {
            let eventFired = false;
            this.element.addEventListener('middle-button-click', function () {
                eventFired = true;
            });

            pressKey(document, 'Enter');

            expect(eventFired).toBeTruthy();
        });

        it('should fire right click event on escape', function () {
            let eventFired = false;
            this.element.addEventListener('right-button-click', function () {
                eventFired = true;
            });

            pressKey(document, 'Escape');

            expect(eventFired).toBeTruthy();
        });

        it('should show left icon', function () {
            createFixture('<mc-dialog header="Hello" icon-left-button="&#xf0c5;"></mc-dialog>');

            let icon = this.page.getLeftIcon();

            expect(icon).toBeTruthy();
        });

        it('should show middle icon', function () {
            createFixture('<mc-dialog header="Hello" icon-middle-button="&#xf0c5;"></mc-dialog>');

            let icon = this.page.getMiddleIcon();

            expect(icon).toBeTruthy();
        });

        it('should show right icon', function () {
            createFixture('<mc-dialog header="Hello" icon-right-button="&#xf0c5;"></mc-dialog>');

            let icon = this.page.getRightIcon();

            expect(icon).toBeTruthy();
        });

        it('should update right button text', function () {
            this.element = createFixture('<mc-dialog header="Hello" icon-right-button="&#xf0c5;"></mc-dialog>');
            this.element.setAttribute('text-right-button', 'Abbrechen');

            let text = this.page.getRightButtonText();
            let icon = this.page.getRightIcon();

            expect(text.textContent).toBe('Abbrechen');
            expect(icon).toBeTruthy();
        });

        it('should update middle button text', function () {
            this.element = createFixture('<mc-dialog header="Hello" icon-middle-button="&#xf0c5;"></mc-dialog>');
            this.element.setAttribute('text-middle-button', 'NewValue');

            let text = this.page.getMiddleButtonText();
            let icon = this.page.getMiddleIcon();

            expect(text.textContent).toBe('NewValue');
            expect(icon).toBeTruthy();
        });

        it('should update left button text', function () {
            this.element = createFixture('<mc-dialog header="Hello" show-left-button="true" icon-left-button="&#xf0c5;"></mc-dialog>');
            this.element.setAttribute('text-left-button', '同意');

            let text = this.page.getLeftButtonText();
            let icon = this.page.getLeftIcon();

            expect(text.textContent).toBe('同意');
            expect(icon).toBeTruthy();
        });

        it('should fire modal click event on background click', function () {
            let eventFired = false;
            this.element.addEventListener('modal-click', function () {
                eventFired = true;
            });

            this.page.getDialog().click();

            expect(eventFired).toBeTruthy();
        });

        it('should not close dialog on click within dialog content', function () {
            this.page.getHeader().click();

            let dialog = this.page.getDialog();
            expect(isVisible(dialog)).toBeTruthy();
        });

        it('left button should be changed to disabled', function () {
            this.element = createFixture('<mc-dialog header="Hello" show-left-button="true"></mc-dialog>');
            this.element.setAttribute('disabled-left-button', 'true');

            let button = this.page.getLeftButton();

            expect(button.hasAttribute('disabled')).toBeTruthy();
        });

        it('middle button should be changed to disabled', function () {
            this.element = createFixture('<mc-dialog header="Hello"></mc-dialog>');
            this.element.setAttribute('disabled-middle-button', 'true');

            let button = this.page.getMiddleButton();

            expect(button.hasAttribute('disabled')).toBeTruthy();
        });

        it('right button should be changed to disabled', function () {
            this.element = createFixture('<mc-dialog header="Hello"></mc-dialog>');
            this.element.setAttribute('disabled-right-button', 'true');

            let button = this.page.getRightButton();

            expect(button.hasAttribute('disabled')).toBeTruthy();
        });
    });

    describe('Custom Content', () => {
        beforeEach(function () {
            this.element = createFixture(`
                <mc-dialog header="Enter a name:">
                    <span slot="content"><input id="input" type="text" value="MyName"></span>
                </mc-dialog>`
            );
        });

        it('should show custom content', function () {
            let input = document.getElementById('input');

            expect(input.value).toBe('MyName');
        });
    });

    describe('Footer Link', () => {
        beforeEach(function () {
            this.element = createFixture(`
                <mc-dialog text-footer-link='My Footer Link' header="Enter a name:">
                </mc-dialog>`
            );
        });

        it('should show footer link', function () {
            let footer = this.page.getFooterLink();

            expect(footer.textContent).toBe('My Footer Link');
        });

        it('should trigger event when clicked', function () {
            let triggered = false;
            this.element.addEventListener('footer-link-pressed', function (e) {
                triggered = true;
            });

            this.page.clickFooterLink();

            expect(triggered).toBeTruthy();
        });
    });

    describe('Input', () => {
        beforeEach(function () {
            this.element = createFixture(`
                <mc-dialog header="Enter a name:" show-input="true" input-value="hello"></mc-dialog>`
            );
        });

        it('should show input field with text', function () {
            let input = this.page.getInput();

            expect(input.value).toBe('hello');
        });

        it('should not show input and input error field by default', function () {
            createFixture(`
                <mc-dialog header="Enter a name:" input-value="hello"></mc-dialog>`
            );

            let input = this.page.getInput();
            let errorMessage = this.page.getErrorMessage();

            expect(isVisible(input)).toBeFalsy();
            expect(isVisible(errorMessage)).toBeFalsy();
        });

        it('should update attribute with input value', function () {
            this.page.enterInput('My Text');

            expect(this.element.getAttribute('input-value')).toBe('My Text');
        });

        it('should show input error', function () {
            createFixture(`
                <mc-dialog header="Enter a name:" show-input="true" input-value="hello" error-message="Invalid value!"></mc-dialog>`
            );

            let errorMessage = this.page.getErrorMessage();

            expect(isVisible(errorMessage)).toBeTruthy();
            expect(errorMessage.textContent).toBe('Invalid value!');
        });

        it('should show error message when updated', function () {
            this.element.addEventListener('middle-button-click', function (e) {
                e.srcElement.setAttribute('error-message', 'Validation Error!');
                e.preventDefault();
            });

            this.page.clickMiddleButton();

            let error = this.page.getErrorMessage();
            expect(isVisible(error)).toBeTruthy();
            expect(error.textContent).toBe('Validation Error!');
        });

        it('should fire right button event on enter with single button', function () {
            this.element = createFixture('<mc-dialog show-middle-button="false" header="Hello"></mc-dialog>');

            let eventFired = false;
            this.element.addEventListener('right-button-click', function () {
                eventFired = true;
            });

            this.page.enterInput('My Text');
            pressKey(document, 'Enter');

            expect(eventFired).toBeTruthy();
        });

        it('should fire middle button event on enter with two button', function () {
            let eventFired = false;
            this.element.addEventListener('middle-button-click', function () {
                eventFired = true;
            });

            this.page.enterInput('My Text');
            pressKey(document, 'Enter');

            expect(eventFired).toBeTruthy();
        });

        it('should fire left button event on enter with three button', function () {
            this.element = createFixture('<mc-dialog show-left-button="true" text-left-button="OK" l header="Hello"></mc-dialog>');

            let eventFired = false;
            this.element.addEventListener('left-button-click', function () {
                eventFired = true;
            });

            this.page.enterInput('My Text');
            pressKey(document, 'Enter');

            expect(eventFired).toBeTruthy();
        });

        it('should fire right button event on escape', function () {
            let eventFired = false;
            this.element.addEventListener('right-button-click', function () {
                eventFired = true;
            });

            this.page.enterInput('My Text');
            pressKey(document, 'Escape');

            expect(eventFired).toBeTruthy();
        });
    });
});
