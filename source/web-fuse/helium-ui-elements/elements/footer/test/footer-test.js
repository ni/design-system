import '../footer.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { FooterPage } from './footer-page.js';

describe('Footer', () => {
    beforeEach(function () {
        this.page = new FooterPage();
        this.element = createFixture('<mc-footer></mc-footer>');
    });

    it('should show the footer', function () {
        let footer = this.page.getFooter();

        expect(isVisible(footer)).toBeTruthy();
    });

    it('should show the content', function () {
        let legal = this.page.getLegal();
        let privacy = this.page.getPrivacy();
        let copyright = this.page.getCopyright();

        expect(legal.textContent).toBe('Legal');
        expect(legal.href).toBe('http://www.ni.com/legal');
        expect(legal.target).toBe('_blank');

        expect(privacy.textContent).toBe('Privacy');
        expect(privacy.href).toBe('http://www.ni.com/legal/privacy/unitedstates/us/');
        expect(privacy.target).toBe('_blank');

        expect(copyright.textContent).toBe('© 2019 National Instruments. All rights reserved.');
    });
});
