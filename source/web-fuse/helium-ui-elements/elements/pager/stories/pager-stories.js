import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/mcpager.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Pager', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Basic Pager', () => `<mc-pager page="${number('Page #', 1)}" page-size="${number('Page size', 20)}" items="${number('# of items', 49)}" go-to-page-label="${text('Go to page label', 'Go to page: ')}" page-size-label="${text('Page size label', 'Show rows: ')}" current-page-label="${text('Current page label', '{from}-{to} of {total}')}"></mc-pager>`)
    .add('Pager without data', () => `<mc-pager go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`)
    .add('Multiple Pagers', () => `
        <mc-pager page="1" page-size="20" items="50" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>
        <mc-pager page="2" page-size="10" items="105" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}"></mc-pager>`);
