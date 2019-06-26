import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
import '../../../../dist/js/elements/slgrid.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

let generateItems = function (count) {
    let result = [];
    for (let i = 1; i <= count; i++) {
        result.push({
            id: i,
            name: 'webapp ' + i,
            nameUrl: 'https://www.systemlinkcloud.com/' + i,
            sharing: 'public',
            dateCreated: new Date(2019, 2, 3, 14, 1, 1, 123),
            update: 'UPDATE'
        });
    }
    return result;
};

let loadItems = function (totalCount, page, pageSize, sortBy, sortOrder) {
    let allItems = generateItems(totalCount);
    if (sortBy === 'name' && sortOrder === 'desc') {
        allItems.reverse();
    }

    let startIndex = (page - 1) * pageSize;
    let endIndex = page * pageSize;
    return allItems.slice(startIndex, endIndex);
};

storiesOf('Grid', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    .add('Grid', () => `
    <sl-grid page-size="5" locale="en-US" go-to-page-label="Go to page: " page-size-label="Show rows: " current-page-label="{from}-{to} of {total}">
        <sl-grid-column type="checkbox" name="selection" width="35px"></sl-grid-column>
        <sl-grid-column type="icon-menu" name="edit" width="30px" icon="&#xf013;">
        <sl-grid-column-item name="rename" title="Rename"></sl-grid-column-item>
        <sl-grid-column-item name="delete" title="Delete"></sl-grid-column-item>
        <sl-grid-column-item name="modify-policy" title="Modify security policy"></sl-grid-column-item>
        </sl-grid-column>
        <sl-grid-column type="icon" name="share" width="30px" icon="&#xf1e0;"></sl-grid-column>
        <sl-grid-column type="url" name="name" title="Name" field="name"></sl-grid-column>
        <sl-grid-column type="text" optional="true" name="sharing" title="Sharing" field="sharing" width="100px" show-on-mobile="false"></sl-grid-column>
        <sl-grid-column type="date" optional="true" show="false" name="dateCreated" title="Date added" field="dateCreated" width="200px" show-on-mobile="false"></sl-grid-column>
        <sl-grid-column type="button" name="update" title="" field="update" width="100px" show-on-mobile="false"></sl-grid-column>
    </sl-grid>`)
    .add('Grid with data', () => {
        const el = document.createElement('sl-grid');
        // el.column = ;
        return el;
    });
