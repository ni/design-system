import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcerror.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Error', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('404 page', () => `<mc-error code="${text('Error code', '404')}" message="Not found" link-text="${text('Link text', 'GO HOME')}" link-url="${text('Link URL', 'https://dev.systemlinkcloud.com/')}"></mc-error>`);
