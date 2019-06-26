import { BannerPage } from '../../banner/test/banner-page.js';

export class CookiesNotificationPage {
    getRoot () {
        return document.querySelector('mc-cookies-notification').shadowRoot;
    }

    getCookiesNotificationText () {
        return this.getRoot().querySelector('span');
    }

    clickConfirmButton () {
        new BannerPage(this.getRoot()).clickOk();
    }
}
