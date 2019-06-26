import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcautocomplete.js';
import '../../../../dist/js/elements/mcdialog.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Dialog', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('OK', () => `<mc-dialog header="${text('Header', 'Header Text')}" show-middle-button="${boolean('Show middle button', false)}" text-right-button="${text('Button text', 'OK')}"></mc-dialog>`)
    .add('OK - Cancel', () => `<mc-dialog header="${text('Header', 'Header Text')}" text-middle-button="${text('Middle button text', 'OK')}" text-right-button="${text('Right button text', 'CANCEL')}"></mc-dialog>`)
    .add('Icon Button', () => `<mc-dialog header="${text('Header', 'Header Text')}" text-middle-button="${text('Middle button text', 'COPY')}" icon-middle-button='&#xf0c5;' text-right-button="${text('Right button text', 'OK')}"></mc-dialog>`)
    .add('Disabled Button', () => `<mc-dialog header="${text('Header', 'Header Text')}" text-middle-button="${text('Middle button text', 'CANCEL')}" text-right-button="${text('Right button text', 'OK')}" disabled-right-button="${text('Disabled right button', 'any string disables the button')}"></mc-dialog>`)
    .add('Footer Link', () => `<mc-dialog header="${text('Header', 'Header Text')}" text-footer-link="${text('Footer text', 'Footer link')}" text-middle-button="${text('Middle button text', 'OK')}" text-right-button="${text('Right button text', 'CANCEL')}"></mc-dialog>`)
    .add('Enter Text', () => `<mc-dialog header="${text('Header', 'Enter a name:')}" show-input="${boolean('Show input', true)}" input-value="${text('Input value', 'hello')}" text-middle-button="${text('Middle button text', 'OK')}" text-right-button="${text('Right button text', 'CANCEL')}"></mc-dialog>`)
    .add('Enter Text - Error', () => `<mc-dialog header="${text('Header', 'Enter a name:')}" show-input="${boolean('Show input', true)}" input-value="${text('Input value', 'hello')}" error-message="${text('Error message', 'Invalid value!')}" text-middle-button="${text('Middle button text', 'OK')}" text-right-button="${text('Right button text', 'CANCEL')}"></mc-dialog>`)
    .add('Custom Content', () => `<mc-dialog header="${text('Header', 'Enter a name:')}" text-middle-button="${text('Middle button text', 'CANCEL')}" text-right-button="${text('Right button text', 'OK')}"><span slot="content"><input id="input" type="text" value="MyName"></span></mc-dialog>`)
    .add('Autocomplete', () => `<mc-dialog header="${text('Header', 'Enter a name:')}" text-middle-button="${text('Middle button text', 'CANCEL')}" text-right-button="${text('Right button text', 'OK')}"><span slot="content"><mc-autocomplete placeholder="My Placeholder"></mc-autocomplete></span></mc-dialog>`)
    .add('Configurable Dialog', () => {
        const el = document.createElement('mc-dialog');
        el.header = text('Header', 'This is the header');
        el.showLeft = boolean('Left button', false);
        el.disabledLeftButton = text('Left button disabled', '');
        el.showMiddle = boolean('Middle button', true);
        el.disabledMiddleButton = text('Middle button disabled', '');
        el.showRight = boolean('Right button', true);
        el.disabledRightButton = text('Right button disabled', '');
        el.textLeft = text('Left button text', 'Info');
        el.textMiddle = text('Middle button text', 'Cancel');
        el.textRight = text('Right button text', 'OK');
        el.footerLinkText = text('Footer link text', '');
        el.iconRight = text('Right button icon', '');
        el.showInput = boolean('Show input', false);
        el.inputValue = text('Input value', '');
        el.errorMessage = text('Error message', '');
        el.addEventListener('right-button-click', e => action('right-button-click')(e));
        el.addEventListener('middle-button-click', e => action('middle-button-click')(e));
        el.addEventListener('left-button-click', e => action('left-button-click')(e));
        el.addEventListener('footer-link-pressed', e => action('footer-link-pressed')(e));
        el.addEventListener('modal-click', e => action('modal-click')(e));
        return el;
    });
