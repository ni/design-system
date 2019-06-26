import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mccookiesnotification.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Cookies Notification', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Basic notice', () => `<mc-cookies-notification confirm-button-text="OK" text="This site uses cookies to offer you a better browsing experience. Learn more about" link-text="our privacy policy."></mc-cookies-notification>`);
