import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mccalltoaction.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Call to action', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('New Dashboard', () => `<mc-calltoaction header="${text('Header', "You haven't created any dashboards yet.")}" icon="mc-calltoaction-dashboard-icon" button-text="${text('Button text', '+ New Dashboard')}" message="${text('Message text', 'Not sure what you need or where to start?')}"></mc-calltoaction>`);