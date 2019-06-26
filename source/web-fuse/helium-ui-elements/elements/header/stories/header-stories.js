import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcheader.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Header', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Header', () => `<mc-header></mc-header>`)
    .add('Header with data', () => {
        const defaultConfig = {
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
        const el = document.createElement('mc-header');
        el.config = defaultConfig;
        return el;
    });
