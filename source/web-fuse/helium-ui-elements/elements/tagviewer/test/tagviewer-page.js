import { GridPage } from '../../grid/test/grid-page.js';
import { ToolbarPage } from '../../toolbar/test/toolbar-page.js';
import { DialogPage } from '../../dialog/test/dialog-page.js';
import { FilterBuilderPage } from '../../filter-builder/test/filter-builder-page.js';
import { TagViewerDetailsPage } from './tagviewer-details-page.js';

export class TagViewerPage {
    getRoot () {
        return document.querySelector('sl-tagviewer').shadowRoot;
    }

    getDetailsPage () {
        return new TagViewerDetailsPage(this.getRoot().querySelector('sl-tagviewer-details'));
    }

    getGridPage () {
        return new GridPage(this.getRoot().querySelector('sl-grid'));
    }

    getFilterBuilderPage () {
        return new FilterBuilderPage(this.getRoot().querySelector('sl-filter-builder'));
    }

    getActionToolbarPage () {
        return new ToolbarPage(this.getRoot().querySelector('.sl-tagviewer-action'));
    }

    getFilterToolbarPage () {
        return new ToolbarPage(this.getRoot().querySelector('.sl-tagviewer-filter'));
    }

    getDialogPage () {
        return new DialogPage(this.getRoot().querySelector('mc-dialog'));
    }

    getMain () {
        return this.getRoot().querySelector('.sl-tagviewer-main');
    }

    getRows () {
        return this.getGridPage().getRows();
    }

    getRow (rowIndex) {
        return this.getRows()[rowIndex];
    }

    getCells (rowIndex) {
        let row = this.getRow(rowIndex);
        return row.querySelectorAll('.sl-grid-cell');
    }

    getCell (rowIndex, columnIndex) {
        let cells = this.getCells(rowIndex);
        return cells[columnIndex];
    }

    clickCheckbox (rowIndex) {
        let cell = this.getCell(rowIndex, 0);
        let checkbox = cell.querySelector('input');
        checkbox.click();
    }

    clickEdit (rowIndex) {
        let cell = this.getCell(rowIndex, 1);
        cell.click();
    }

    clickCreateTag () {
        this.getActionToolbarPage().getToolbarItems()[0].click();
    }

    clickUpdate () {
        let item = this.getActionToolbarPage().getToolbarItems()[1];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    clickResetAggregates () {
        let item = this.getActionToolbarPage().getToolbarItems()[2];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    clickDeleteTag () {
        let item = this.getActionToolbarPage().getToolbarItems()[3];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    clickHistory () {
        let item = this.getActionToolbarPage().getToolbarItems()[4];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    getExportDropDownItems () {
        return this.getActionToolbarPage().getDropDownItems();
    }

    clickExport () {
        let item = this.getActionToolbarPage().getToolbarItems()[5];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    clickExportHistory () {
        let item = this.getActionToolbarPage().getDropDownItems()[0];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    clickExportDetails () {
        let item = this.getActionToolbarPage().getDropDownItems()[1];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    getExportHistoryRange () {
        return this.getRoot().querySelector('#history-range');
    }

    getExportHistorySamples () {
        return this.getRoot().querySelector('#history-samples');
    }

    getExportHisoryButton () {
        return this.getDialogPage().getMiddleButton();
    }

    clickExportHisoryButton () {
        this.getExportHisoryButton().click();
    }

    clickFilter () {
        this.getFilterToolbarPage().getToolbarItems()[0].click();
    }

    getDialogHeader () {
        return this.getDialogPage().getHeader();
    }

    getNewTagPath () {
        return this.getRoot().querySelector('#new-tag-path');
    }

    getNewTagType () {
        return this.getRoot().querySelector('#new-tag-type');
    }

    getNewTagRetention () {
        return this.getRoot().querySelector('#new-tag-retention');
    }

    getNewTagCollectAggregates () {
        return this.getRoot().querySelector('#new-tag-collect-aggregates');
    }

    getCreateButton () {
        return this.getDialogPage().getMiddleButton();
    }

    clickCreateButton () {
        this.getCreateButton().click();
    }

    clickOKButton () {
        this.getDialogPage().getMiddleButton().click();
    }

    clickUpdateButton () {
        this.getDialogPage().getLeftButton().click();
    }

    getFilterBuilderFieldSelector (index) {
        return this.getFilterBuilderPage().getFieldSelector(index);
    }

    getFilterBuilderValueInput (index) {
        return this.getFilterBuilderPage().getValueInput(index);
    }

    getSearchInput () {
        return this.getRoot().querySelector('.sl-tagviewer-search-input');
    }
}
