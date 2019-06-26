import '../error.js';

import { createFixture } from '../../test/test-utils.js';
import { ErrorPage } from './error-page.js';

describe('Error', () => {
    beforeEach(function () {
        this.page = new ErrorPage();
        this.element = createFixture(
            '<mc-error code="404" message="Not found" link-text="Go HOME" link-url="https://dev.systemlinkcloud.com/"></mc-error>'
        );
    });

    it('should show the error message and code', function () {
        let code = this.page.getCode();
        let message = this.page.getMessage();

        expect(code.textContent).toBe('404');
        expect(message.textContent).toBe('Not found');
    });

    it('should show the link with the correct text and url', function () {
        let link = this.page.getLink();

        expect(link.textContent).toBe('Go HOME');
        expect(link.href).toBe('https://dev.systemlinkcloud.com/');
    });

    it('should update the message when attribute changed', function () {
        this.element.setAttribute('message', 'New Message');

        let message = this.page.getMessage();

        expect(message.textContent).toBe('New Message');
    });

    it('should update the code when attribute changed', function () {
        this.element.setAttribute('code', '500');

        let code = this.page.getCode();

        expect(code.textContent).toBe('500');
    });

    it('should update the link text when attribute changed', function () {
        this.element.setAttribute('link-text', 'New Link Text');

        let link = this.page.getLink();

        expect(link.textContent).toBe('New Link Text');
    });

    it('should update the link url when attribute changed', function () {
        this.element.setAttribute('link-url', '/new-url');

        let link = this.page.getLink();

        expect(link.href).toContain('/new-url');
    });
});
