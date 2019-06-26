import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/sllisteditor.js';
// import '../../../../src/elements/list-editor/list-editor.js';
import '../../../../dist/styles/root.css';
// import '../../../../src/elements/root/root.css';
// import '../../../../src/elements/common/styles/icons.css';
// import '../../../../src/elements/common/styles/input.css';
import readme from '../README.md';

storiesOf('List Editor', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('List Editor', () => `<sl-list-editor placeholder="Keyword"></sl-list-editor>`);
