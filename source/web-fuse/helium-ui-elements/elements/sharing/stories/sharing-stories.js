import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcsharing.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Sharing', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Sharing', () => `
        <mc-sharing
            everyone="Everyone"
            header="Awesome App that does not really do much.nipkg"
            email-placeholder="Enter an email or 'Everyone'"
            message-add-text="Add message"
            message-remove-text="Remove custom message"
            message-placeholder="Enter your custom message here."
            error-message-invalid-email="Provide valid email or 'Everyone'"
            error-message-already-public="Already public"
            error-message-already-used="This email is already used">
        </mc-sharing>`);
