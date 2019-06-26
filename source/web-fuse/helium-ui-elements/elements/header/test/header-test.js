import '../header.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { HeaderPage } from './header-page.js';

describe('Header', () => {
    beforeEach(function () {
        this.defaultConfig = {
            app: { name: 'SystemLinkCloud', text: 'SystemLink Cloud', href: '#', target: '_self' },
            categories: [
                { name: 'Home', text: 'Home', href: '#', target: '_self', active: true },
                { name: 'Dashboards', text: 'Dashboards', href: '/dashboardhosting', target: '_self' },
                { name: 'WebApps', text: 'Web apps', href: '/webapphosting', target: '_self' },
                { name: 'Security', text: 'Security', href: '/security', target: '_self' }
            ],
            userMenu: [
                { name: 'Account', text: 'Account', href: '#', target: '_self' },
                { name: 'Logout', text: 'Logout', href: '/logout', target: '_self' }
            ],
            helpMenu: [
                { name: 'FAQ', text: 'FAQ', href: 'https://dev.systemlinkcloud.com/faq', target: '_blank' },
                { name: 'Support', text: 'Support', href: '#', target: '_self' },
                { name: 'Feedback', text: 'Give feedback', href: 'mailto:lvcloudoperations@ni.com', target: '_self' }
            ]
        };
        this.page = new HeaderPage();
        this.element = createFixture('<mc-header></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });
    });

    it('should show the header and fields', function () {
        let header = this.page.getHeader();
        let appTitle = this.page.getAppTitle();

        expect(isVisible(header)).toBeTruthy();
        expect(appTitle.textContent).toBe('SystemLink Cloud');
    });

    it('should highlight the active category', function () {
        let activeCategory = this.page.getActiveCategory();

        expect(activeCategory.textContent).toBe('Home');
    });

    it('should fire event when clicking app title', function () {
        let clickEvent;
        this.element.addEventListener('app-title-click', function (e) {
            clickEvent = e;
        });

        this.page.getAppTitle().click();

        expect(clickEvent.detail.name).toBe('SystemLinkCloud');
        expect(clickEvent.detail.text).toBe('SystemLink Cloud');
    });

    it('should fire event when clicking category', function () {
        let clickEvent;
        this.element.addEventListener('category-click', function (e) {
            clickEvent = e;
        });

        this.page.getActiveCategory().click();

        expect(clickEvent.detail.name).toBe('Home');
        expect(clickEvent.detail.text).toBe('Home');
    });

    it('should render link in user menu entry', function () {
        let link = this.page.getUserMenuEntries()[1];

        expect(link.textContent).toBe('Logout');
        expect(link.href).toContain('/logout');
        expect(link.target).toBe('_self');
    });

    it('should render link in help menu entry', function () {
        let link = this.page.getHelpMenuEntries()[2];

        expect(link.textContent).toBe('Give feedback');
        expect(link.href).toBe('mailto:lvcloudoperations@ni.com');
        expect(link.target).toBe('_self');
    });

    it('should fire event when clicking user menu entry', function () {
        let clickEvent;
        this.element.addEventListener('user-menu-click', function (e) {
            clickEvent = e;
        });

        this.page.getUserMenuEntries()[0].click();

        expect(clickEvent.detail.name).toBe('Account');
    });

    it('should fire event when clicking help menu entry', function () {
        let clickEvent;
        this.element.addEventListener('help-menu-click', function (e) {
            clickEvent = e;
        });

        this.page.getHelpMenuEntries()[1].click();

        expect(clickEvent.detail.name).toBe('Support');
    });

    it('should not perform category action when event was cancelled', function () {
        this.element.addEventListener('category-click', function (evt) {
            evt.preventDefault();
        });

        this.page.getCategories()[1].click();

        expect(window.location.href).not.toContain('/dashboardhosting');
    });

    it('should not perform user menu action when event was cancelled', function () {
        this.element.addEventListener('user-menu-click', function (evt) {
            evt.preventDefault();
        });

        this.page.getHelpMenuEntries()[1].click();

        expect(window.location.href).not.toContain('/logout');
    });

    it('should not perform help menu action when event was cancelled', function () {
        this.element.addEventListener('help-menu-click', function (evt) {
            evt.preventDefault();
        });

        this.page.getHelpMenuEntries()[0].click();

        expect(window.location.href).not.toContain('/faq');
    });

    it('should hide the user menu', function () {
        this.element = createFixture('<mc-header show-user-menu="false"></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });

        let userMenu = this.page.getUserMenuButton();

        expect(isVisible(userMenu)).toBeFalsy();
    });

    it('should hide the help menu', function () {
        this.element = createFixture('<mc-header show-help-menu="false"></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });

        let helpMenu = this.page.getHelpMenuButton();

        expect(isVisible(helpMenu)).toBeFalsy();
    });

    it('should show the user name', function () {
        this.element = createFixture('<mc-header user-name="Thomas Schmitt"></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });

        let userName = this.page.getUserName();

        expect(userName.textContent).toBe('Thomas Schmitt');
    });

    it('should update the user name and user menu', function () {
        this.element = createFixture('<mc-header show-user-menu="false"></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });

        this.element.setAttribute('show-user-menu', 'true');
        this.element.setAttribute('user-name', 'Thomas Schmitt');

        let userMenu = this.page.getUserMenuButton();
        expect(isVisible(userMenu)).toBeTruthy();

        let userName = this.page.getUserName();
        expect(userName.textContent).toBe('Thomas Schmitt');
    });

    it('should allow late binding of config options', function () {
        this.element = createFixture('<mc-header></mc-header>');
        this.element.config = this.defaultConfig;

        let appTitle = this.page.getAppTitle();
        expect(appTitle.textContent).toBe('SystemLink Cloud');
        let categories = this.page.getCategories();
        expect(categories.length).toBe(4);
        let helpMenuEntries = this.page.getHelpMenuEntries();
        expect(helpMenuEntries.length).toBe(3);
        let userMenuEntries = this.page.getUserMenuEntries();
        expect(userMenuEntries.length).toBe(2);
    });

    it('should allow re-binding of config options', function () {
        this.element = createFixture('<mc-header show-user-menu="false"></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });

        let modifiedConfig = this.defaultConfig;
        modifiedConfig.app.text = 'New App Name';
        this.element.config = modifiedConfig;

        let appTitle = this.page.getAppTitle();
        expect(appTitle.textContent).toBe('New App Name');
    });

    it('should render user-name as text', function () {
        this.element = createFixture('<mc-header user-name="<a href>evil</a>"></mc-header>',
            element => {
                element.config = this.defaultConfig;
            });

        let userName = this.page.getUserName();

        expect(userName.textContent).toBe('<a href>evil</a>');
    });

    it('should escape app text', function () {
        this.element = createFixture('<mc-header></mc-header>');

        let modifiedConfig = this.defaultConfig;
        modifiedConfig.app.text = '<a href>evil</a>';
        this.element.config = modifiedConfig;

        let appTitle = this.page.getAppTitle();
        expect(appTitle.textContent).toBe('<a href>evil</a>');
    });
});
