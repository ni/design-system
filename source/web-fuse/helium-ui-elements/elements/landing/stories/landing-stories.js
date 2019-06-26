import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mclanding.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Landing Page', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('SLC Landing Page', () => `
        <mc-landing>
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
