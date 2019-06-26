import '../cookies-notification.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { CookiesNotificationPage } from './cookies-notification-page.js';

describe('Cookies Notification', () => {
    beforeEach(function () {
        this.page = new CookiesNotificationPage();
        this.element = createFixture(
            `<mc-cookies-notification confirm-button-text="OK" text="This site uses cookies to offer you a better browsing experience. Learn more about" link-text="our privacy policy."></mc-cookies-notification>`
        );
    });

    it('should show the element', function () {
        let text = this.page.getCookiesNotificationText();

        expect(isVisible(text)).toBeTruthy();
        expect(text.textContent).toBe('This site uses cookies to offer you a better browsing experience. Learn more about our privacy policy.');
    });

    it('should fire event on button click', function () {
        let clicked = false;
        this.element.addEventListener('cookies-confirmed', function () {
            clicked = true;
        });

        this.page.clickConfirmButton();

        expect(clicked).toBeTruthy();
    });
});
