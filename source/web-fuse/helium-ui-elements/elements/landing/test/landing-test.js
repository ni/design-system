import '../landing.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { LandingPage } from './landing-page.js';

describe('Landing', () => {
    beforeEach(function () {
        this.page = new LandingPage();
        this.element = createFixture(
            `<mc-landing>
                <mc-landing-primary>
                    <mc-landing-item
                        name="Dashboards"
                        href="/dashboardhosting"
                        target="_self"
                        image="dashboard-hosting_white"
                        help="Create drag-and-drop, web-based dashboards for data visualization"
                        call-to-action="Go to Dashboards"></mc-landing-item>
                    <mc-landing-item
                        name="Web apps"
                        href="/webapphosting"
                        target="_self"
                        image="web-app-hosting_white"
                        help="Host web applications created with LabVIEW NXG Web Module"
                        call-to-action="Go to Web apps"></mc-landing-item>
                    <mc-landing-item
                        name="Security"
                        href="/security"
                        target="_self"
                        image="security-icon_white"
                        help="Create and manage device keys and policies for secure access"
                        call-to-action="Manage security"></mc-landing-item>
                </mc-landing-primary>
                <mc-landing-secondary>
                    <mc-landing-item
                        name="Getting started"
                        href="/gettingstarted"
                        target="_self"
                        help="The first steps for using SystemLink Cloud."
                        call-to-action="Get started"></mc-landing-item>
                    <mc-landing-item
                        name="Tag viewer"
                        href="/tags/viewer"
                        target="_self"
                        help="View and manage tags hosted on SystemLink Cloud."
                        call-to-action="View tags"></mc-landing-item>
                </mc-landing-secondary>
                <mc-landing-tertiary>
                    <mc-landing-item
                        name="FAQ"
                        href="/faq"
                        target="_blank"
                        help="Get answers to common questions."
                        call-to-action="Read the FAQ"></mc-landing-item>
                    <mc-landing-item
                        name="Support"
                        href="https://forums.ni.com/t5/SystemLink/bd-p/1020"
                        target="_self"
                        help="Get help from SystemLink Cloud support."
                        call-to-action="Get support"></mc-landing-item>
                    <mc-landing-item
                        name="SystemLink API Docs"
                        href="https://www.ni.com/documentation/en/systemlink-data-services/latest/manual/manual-overview/"
                        target="_self"
                        help="Gain the insight you need to use the SystemLink data services API."
                        call-to-action="Get API docs"></mc-landing-item>
                </mc-landing-tertiary>
            </mc-landing>`);
    });

    it('should show the landing page', function () {
        let landing = this.page.getLandingPage();

        expect(isVisible(landing)).toBeTruthy();
    });

    it('should display the primary sections', function () {
        let headers = this.page.getPrimaryHeaders();

        expect(headers.length).toBe(3);
        expect(headers[0].textContent).toBe('Dashboards');
        expect(headers[1].textContent).toBe('Web apps');
        expect(headers[2].textContent).toBe('Security');
    });

    it('should display the secondary sections', function () {
        let headers = this.page.getSecondaryHeaders();

        expect(headers.length).toBe(2);
        expect(headers[0].textContent).toBe('Getting started');
        expect(headers[1].textContent).toBe('Tag viewer');
    });

    it('should display the primary descriptions', function () {
        let descriptions = this.page.getPrimaryDescriptions();

        expect(descriptions.length).toBe(3);
        expect(descriptions[0].textContent).toBe('Create drag-and-drop, web-based dashboards for data visualization');
        expect(descriptions[1].textContent).toBe('Host web applications created with LabVIEW NXG Web Module');
        expect(descriptions[2].textContent).toBe('Create and manage device keys and policies for secure access');
    });

    it('should display the secondary descriptions', function () {
        let descriptions = this.page.getSecondaryDescriptions();

        expect(descriptions.length).toBe(2);
        expect(descriptions[0].textContent).toBe('The first steps for using SystemLink Cloud.');
        expect(descriptions[1].textContent).toBe('View and manage tags hosted on SystemLink Cloud.');
    });

    it('should display the tertiary descriptions', function () {
        let descriptions = this.page.getTertiaryDescriptions();

        expect(descriptions.length).toBe(3);
        expect(descriptions[0].textContent).toBe('Get answers to common questions.');
        expect(descriptions[1].textContent).toBe('Get help from SystemLink Cloud support.');
        expect(descriptions[2].textContent).toBe('Gain the insight you need to use the SystemLink data services API.');
    });

    it('should display the primary actions', function () {
        let actions = this.page.getPrimaryActions();

        expect(actions.length).toBe(3);
        expect(actions[0].textContent).toBe('Go to Dashboards');
        expect(actions[1].textContent).toBe('Go to Web apps');
        expect(actions[2].textContent).toBe('Manage security');
    });

    it('should display the secondary actions', function () {
        let actions = this.page.getSecondaryActions();

        expect(actions.length).toBe(2);
        expect(actions[0].textContent).toBe('Get started');
        expect(actions[1].textContent).toBe('View tags');
    });

    it('should display the tertiary actions', function () {
        let actions = this.page.getTertiaryActions();

        expect(actions.length).toBe(3);
        expect(actions[0].textContent).toBe('Read the FAQ');
        expect(actions[1].textContent).toBe('Get support');
        expect(actions[2].textContent).toBe('Get API docs');
    });
});
