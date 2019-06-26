import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcautocomplete.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Autocomplete', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Autocomplete', () => '<mc-autocomplete placeholder="placeholder"></mc-autocomplete>')
    .add('With data', () => {
        const el = document.createElement('mc-autocomplete');
        el.items = ['aaa', 'aardavark', 'bbb', 'baseball', 'ccc', 'dddd'];
        return el;
    });
