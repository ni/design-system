import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcbanner.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Banner', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Banner', () => `<mc-banner close-button-text="${text('Button text', 'OK')}" visible></mc-banner>`)
    .add('Banner with content', () => `
    <mc-banner visible close-button-text="${text('Button text', 'OK')}">
        <span slot="content">${text('Span content text', 'This site uses cookies. Happy browsing!!!')}</span>
    </mc-banner>`);
