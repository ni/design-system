import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcfooter.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Footer', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('NI Footer', () => '<mc-footer></mc-footer>');
