import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/slfilterbuilder.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Filter Builder', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Filter', () => `
        <sl-filter-builder>
            <sl-filter-builder-item name="path" text="Path">
                <sl-filter-builder-operation name="MATCHES" text="matches"></sl-filter-builder-operation>
            </sl-filter-builder-item>
            <sl-filter-builder-item name="keywords" text="Keywords">
                <sl-filter-builder-operation name="EQUALS" text="equals"></sl-filter-builder-operation>
            </sl-filter-builder-item>
            <sl-filter-builder-item name="properties" text="Properties" type="KeyValue">
                <sl-filter-builder-operation name="EQUALS" text="equals"></sl-filter-builder-operation>
            </sl-filter-builder-item>
        </sl-filter-builder>`);
