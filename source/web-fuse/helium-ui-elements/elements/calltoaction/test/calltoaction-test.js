import '../calltoaction.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { CallToActionPage } from './calltoaction-page.js';

describe('Call To Action', () => {
    beforeEach(function () {
        this.page = new CallToActionPage();
        this.element = createFixture(
            `<mc-calltoaction
                header="You haven't created any dashboards yet."
                icon="mc-calltoaction-dashboard-icon"
                button-text="+ New Dashboard"
                message="Not sure what you need or where to start?">
            </mc-calltoaction>`
        );
    });

    it('should show the element', function () {
        let calltoaction = this.page.getCallToAction();

        expect(isVisible(calltoaction)).toBeTruthy();
    });

    it('should show the header, button, message and help text', function () {
        let header = this.page.getHeader();
        let button = this.page.getButton();
        let message = this.page.getMessage();
        let help = this.page.getHelp();

        expect(header.textContent).toBe('You haven\'t created any dashboards yet.');
        expect(button.textContent).toBe('+ New Dashboard');
        expect(message.textContent).toBe('Not sure what you need or where to start?');
        expect(help.textContent).toBe('Check out our Getting Started guide and FAQs for help.');
    });

    it('should fire event on action button click', function () {
        let clicked = false;
        this.element.addEventListener('action-button-click', function () {
            clicked = true;
        });

        this.page.clickButton();

        expect(clicked).toBeTruthy();
    });
});
