import '../status.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { StatusPage } from './status-page.js';

describe('Status', () => {
    describe('Basic  ', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-status
                    message="Awesome message"
                    additional-message="Awesome additional message"
                    title="Title!"
                    state="pending">
                </mc-status>`);
            this.page = new StatusPage();
        });

        it('should show status message', function () {
            expect(this.page.getStatusMessage()).toBe('Awesome message');
        });

        it('should update status message', function () {
            this.element.setAttribute('message', 'Even more awesome message');
            expect(this.page.getStatusMessage()).toBe('Even more awesome message');
        });

        it('should show additional status message', function () {
            expect(this.page.getStatusAdditionalMessage()).toBe('Awesome additional message');
        });

        it('should update additional status message', function () {
            this.element.setAttribute('additional-message', 'Even more awesome additional message');
            expect(this.page.getStatusAdditionalMessage()).toBe('Even more awesome additional message');
        });

        it('should show title', function () {
            expect(this.page.getTitle()).toBe('Title!');
        });

        it('should update title', function () {
            this.element.setAttribute('title', 'New title !!');
            expect(this.page.getTitle()).toBe('New title !!');
        });

        it('pending state should show pending icon ', function () {
            expect(this.page.getIcon().classList.value).toBe('mc-status-waiting-icon');
        });

        it('success state should show success icon ', function () {
            this.element.setAttribute('state', 'success');
            expect(this.page.getIcon().classList.value).toBe('mc-status-success-icon');
        });

        it('failed state should show failed icon ', function () {
            this.element.setAttribute('state', 'failed');
            expect(this.page.getIcon().classList.value).toBe('mc-status-failed-icon');
        });
    });

    describe('with empty attributes ', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-status></mc-status>`);
            this.page = new StatusPage();
        });

        it('should hide status message if null', function () {
            expect(isVisible(this.page.getStatusMessageHolder())).toBeFalsy();
        });

        it('should show status message updated with a mesage', function () {
            this.element.setAttribute('message', 'Non empty message');
            expect(isVisible(this.page.getStatusMessageHolder())).toBeTruthy();
        });

        it('should hide status message updated with empty value', function () {
            this.element.setAttribute('message', '');
            expect(isVisible(this.page.getStatusMessageHolder())).toBeFalsy();
        });

        it('should hide additional message if null', function () {
            expect(isVisible(this.page.getStatusAdditionalMessageHolder())).toBeFalsy();
        });

        it('should show status aditional message updated with a non mepty mesage', function () {
            this.element.setAttribute('additional-message', 'Non empty message');
            expect(isVisible(this.page.getStatusAdditionalMessageHolder())).toBeTruthy();
        });

        it('should hide additional message updated with empty value', function () {
            this.element.setAttribute('additional-message', '');
            expect(isVisible(this.page.getStatusAdditionalMessageHolder())).toBeFalsy();
        });

        //
        it('should hide title if null', function () {
            expect(isVisible(this.page.getTitleHolder())).toBeFalsy();
        });

        it('should show status aditional message updated with a non mepty mesage', function () {
            this.element.setAttribute('title', 'Non empty message');
            expect(isVisible(this.page.getTitleHolder())).toBeTruthy();
        });

        it('should hide title updated with empty value', function () {
            this.element.setAttribute('title', '');
            expect(isVisible(this.page.getTitleHolder())).toBeFalsy();
        });
    });
});
